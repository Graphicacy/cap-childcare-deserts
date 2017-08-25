import { exec, ExecOptions } from 'child_process';
import * as commander from 'commander';
import * as csv from 'csv-parse';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import { format } from 'prettier';
import * as shapefile from 'shapefile';

const { merge } = require('@mapbox/geojson-merge'); // tslint:disable-line

if (require.main === module) run().catch(console.error);

async function run() {
  const program = commander
    .option('-s, --state-data <csvfile>', 'parse state data file')
    .option('-j, --state-tiles <glob>', 'generate state mapbox tiles')
    .option('-t, --census-tiles <glob>', 'generate census mapbox tiles')
    .option(
      '-l, --locations <locationfile>',
      'generate formatted location file'
    )
    .parse(process.argv);

  switch (true) {
    case !!program.stateData:
      await prepStateData(program.stateData);
      break;

    case !!program.censusTiles:
      await prepShapefiles(program.censusTiles);
      break;

    case !!program.stateTiles:
      await prepStateJson(program.stateTiles);
      break;

    case !!program.locations:
      await prepLocationData(program.locations);
      break;

    default: {
      program.outputHelp();
    }
  }

  process.exit(0);
}

async function prepLocationData(locations: string) {
  const data = await readCsv<{
    state: string;
    latitude: number;
    longitude: number;
    center_type: number;
  }>(locations);

  const features = data.map(({ state, latitude, longitude, center_type }) => {
    const abbr = getStateAbbr(state);

    return {
      type: 'Feature',
      properties: { center_type, abbr },
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    };
  });

  await fs.writeFile(
    path.join(process.cwd(), './data/locations-formatted.json'),
    JSON.stringify({
      type: 'FeatureCollection',
      features
    })
  );

  await prun(
    `tippecanoe -o ./data/tmp/locations.mbtiles -Z 2 -zg ./data/locations-formatted.json`
  );

  console.log(`finished!`);
}

async function prepStateJson(globString: string) {
  const files = glob.sync(globString);
  const tmp = path.join(__dirname, '../data/tmp');
  const json = path.join(__dirname, '../data/tmp/state-json');

  mkdirp(tmp);
  mkdirp(json);

  const result = await readCsv<StateDataResult>('./data/state-data.csv');
  const reducedOut: { [key: string]: StateDataResult } = {};
  const reduced = result.reduce((out, d) => {
    out[d.Abbr] = d;
    return out;
  }, reducedOut);

  const exclude = new Set(['AK', 'HI']);

  const mapped = await Promise.all(
    files.map(async file => {
      const buffer = await fs.readFile(file);
      const state = JSON.parse(buffer.toString());
      const feature = state.features[0];
      const id = feature.id.replace('USA-', '');
      feature.properties.id = id;
      if (!exclude.has(id)) {
        const data = reduced[id];
        if (data) {
          Object.keys(data).forEach((k: keyof StateDataResult) => {
            feature.properties[camelcase(k)] = data[k];
          });
        }
      }

      return { feature, id };
    })
  );

  const merged = merge(
    mapped.filter(({ id }) => !exclude.has(id)).map(({ feature }) => feature)
  );

  await fs.writeFile(
    path.join(json, `all-states.json`),
    JSON.stringify(merged)
  );

  await prun(
    `tippecanoe -o ./data/tmp/all-states.mbtiles -Z 2 -zg ./data/tmp/state-json/all-states.json`
  );

  console.log(`finished!`);
}

async function prepShapefiles(globString: string) {
  const files = glob.sync(globString);
  const tmp = path.join(__dirname, '../data/tmp');
  const json = path.join(__dirname, '../data/json');

  mkdirp(tmp);
  mkdirp(json);

  const outStream = fs.createWriteStream('./data/tmp/all-tracts.json');
  const data = await readCsv<TractDataResult>('./data/tract_data_cleaned.csv');
  const tractHashOut: { [key: string]: TractDataResult } = {};
  const tractHash = data.reduce((out, d) => {
    out[d.tract.toString()] = d;
    return out;
  }, tractHashOut);

  outStream.write(`{"type":"FeatureCollection","features":[`);
  let first = true;

  await Promise.all(
    files.map(async file => {
      const bits = file.split('/');
      const name = bits[bits.length - 1].replace('.shp', '');

      const result = await shapefile.read(file);
      result.features.forEach((f: any) => {
        const tract = Number(f.properties.GEOID);
        const tractData = tractHash[tract];
        if (tractData) {
          Object.keys(tractData).forEach((k: keyof TractDataResult) => {
            if (k !== 'tract') {
              f.properties[k] = tractData[k];
            }
          });
        } else {
          console.log(`No data for ${tract}...`);
        }
      });

      if (!first) outStream.write(',');
      first = false;
      outStream.write(
        result.features.map(f => JSON.stringify(f) + '\n').join(',')
      );

      console.log(`wrote ${name}...`);
    })
  );

  outStream.write(']}');
  outStream.end();

  console.log(`generating tiles...`);
  await prun(
    `tippecanoe -o ./data/tmp/all-tracts.mbtiles -f -Z 2 -zg ./data/tmp/all-tracts.json`
  );

  console.log(`finished!`);
}

async function readCsv<T>(filename: string) {
  const file = await fs.readFile(path.join(process.cwd(), filename));
  const result = await new Promise<T[]>((res, rej) =>
    csv(
      file.toString(),
      { auto_parse: true, columns: true },
      (err: Error, d: any) => (err ? rej(err) : res(d))
    )
  );
  return result;
}

async function prepStateData(filename: string) {
  const result = await readCsv<StateDataResult>(filename);

  // https://gist.github.com/mishari/5ecfccd219925c04ac32
  const bounds = require('../data/bounds.json').bounds;

  const boundsByState = bounds.reduce((out: any, stateBounds: any) => {
    const data = stateBounds[0];
    const state = data.display_name.split(',')[0].trim();
    out[state] = data;
    return out;
  }, {});

  const states = result.map(r => r.State);

  const reduced = result.reduce((out, r: any) => {
    out[r.State] = Object.keys(r).reduce((d, k) => {
      d[camelcase(k)] = r[k];
      return d;
    }, {} as any);

    if (r.State in boundsByState) {
      const { boundingbox, lat, lon } = boundsByState[r.State];
      out[r.State].bounds = boundingbox.map(Number);
      out[r.State].center = [Number(lon), Number(lat)];
    }

    return out;
  }, {} as any);

  const code = format(
    `
/**
 *
 * don't edit this file, it's generated by ./dev/data.ts using the state csv file
 *
 */
/**
 * name of state with data
 */
      export type StateName = ${states.map(s => JSON.stringify(s)).join('|')};

      export const stateList: StateName[] = ${JSON.stringify(states)};

      export const stateData = ${JSON.stringify(reduced)};
    `,
    { singleQuote: true }
  );

  console.log(`writing ./src/data/states.ts...`);
  fs.writeFileSync(path.join(__dirname, '../src/data/states.ts'), code);
}

// promise based exec
export default function prun(
  cmd: string,
  options: ExecOptions = {}
): Promise<{ err: Error; stdout: string; stderr: string }> {
  // always resolve with err, standard out, and standard error
  const cb = (res: any) => (err: Error, stdout: string, stderr: string) => {
    res({ err, stdout, stderr });
  };
  return new Promise(res => {
    exec(cmd, options, cb(res));
  });
}

// pulled from https://gist.github.com/mshafrir/2646763#file-states_hash-json
function getStateAbbr(state: string) {
  switch (state) {
    case 'All states':
      return 'US';
    case 'Alabama':
      return 'AL';
    case 'Alaska':
      return 'AK';
    case 'American Samoa':
      return 'AS';
    case 'Arizona':
      return 'AZ';
    case 'Arkansas':
      return 'AR';
    case 'California':
      return 'CA';
    case 'Colorado':
      return 'CO';
    case 'Connecticut':
      return 'CT';
    case 'Delaware':
      return 'DE';
    case 'District Of Columbia':
      return 'DC';
    case 'Federated States Of Micronesia':
      return 'FM';
    case 'Florida':
      return 'FL';
    case 'Georgia':
      return 'GA';
    case 'Guam':
      return 'GU';
    case 'Hawaii':
      return 'HI';
    case 'Idaho':
      return 'ID';
    case 'Illinois':
      return 'IL';
    case 'Indiana':
      return 'IN';
    case 'Iowa':
      return 'IA';
    case 'Kansas':
      return 'KS';
    case 'Kentucky':
      return 'KY';
    case 'Louisiana':
      return 'LA';
    case 'Maine':
      return 'ME';
    case 'Marshall Islands':
      return 'MH';
    case 'Maryland':
      return 'MD';
    case 'Massachusetts':
      return 'MA';
    case 'Michigan':
      return 'MI';
    case 'Minnesota':
      return 'MN';
    case 'Mississippi':
      return 'MS';
    case 'Missouri':
      return 'MO';
    case 'Montana':
      return 'MT';
    case 'Nebraska':
      return 'NE';
    case 'Nevada':
      return 'NV';
    case 'New Hampshire':
      return 'NH';
    case 'New Jersey':
      return 'NJ';
    case 'New Mexico':
      return 'NM';
    case 'New York':
      return 'NY';
    case 'North Carolina':
      return 'NC';
    case 'North Dakota':
      return 'ND';
    case 'Northern Mariana Islands':
      return 'MP';
    case 'Ohio':
      return 'OH';
    case 'Oklahoma':
      return 'OK';
    case 'Oregon':
      return 'OR';
    case 'Palau':
      return 'PW';
    case 'Pennsylvania':
      return 'PA';
    case 'Puerto Rico':
      return 'PR';
    case 'Rhode Island':
      return 'RI';
    case 'South Carolina':
      return 'SC';
    case 'South Dakota':
      return 'SD';
    case 'Tennessee':
      return 'TN';
    case 'Texas':
      return 'TX';
    case 'Utah':
      return 'UT';
    case 'Vermont':
      return 'VT';
    case 'Virgin Islands':
      return 'VI';
    case 'Virginia':
      return 'VA';
    case 'Washington':
      return 'WA';
    case 'West Virginia':
      return 'WV';
    case 'Wisconsin':
      return 'WI';
    case 'Wyoming':
      return 'WY';
    default:
      throw new Error(`No abbreviation for ${state}`);
  }
}

function camelcase(p: string) {
  return p
    .split(/[^\w\d]+/i)
    .map(
      (s, i) =>
        i > 0
          ? s.charAt(0).toUpperCase() + s.slice(1, s.length).toLowerCase()
          : s.toLowerCase()
    )
    .join('');
}

function mkdirp(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}

interface StateDataResult {
  State: string;
  'Percent in deserts - All': number;
  'Percent in deserts - Black': number;
  'Percent in deserts - White': number;
  'Percent in deserts - Hispanic': number;
  'Chidren under 5 in deserts- rural': number;
  'Children under 5 not in deserts- rural': number;
  'Children under 5 in deserts- suburban': number;
  'Children under 5 not in deserts- suburban': number;
  'Children under 5  in deserts- urban': number;
  'Children under 5 not in deserts- urban': number;
  'Text box': string;
  'Abbr': string;
}

interface TractDataResult {
  state: string;
  tract: number;
  ccdesert: number;
  per_latino: number;
  per_white: number;
  per_black: number;
  per_aian: number;
  per_asian: number;
  per_nhpi: number;
  per_twomore: number;
  urbanicity: string;
  noproviders: number;
  state_fips: number;
}
