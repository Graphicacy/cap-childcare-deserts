import * as csv from 'csv-parse';
import * as commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'bluebird';
import { format } from 'prettier';

const read = promisify(fs.readFile);

if (require.main === module) run().catch(console.error);

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
}

export async function run() {
  const program = commander
    .option('-s, --state-data <csvfile>', 'parse state data file')
    .parse(process.argv);

  if (program.stateData) {
    const file = await read(path.join(process.cwd(), program.stateData));
    const result = await new Promise<StateDataResult[]>((res, rej) =>
      csv(
        file.toString(),
        { auto_parse: true, columns: true },
        (err: Error, d: any) => (err ? rej(err) : res(d))
      )
    );

    const states = result.map(r => r.State);
    const reduced = result.reduce((out, r) => {
      out[r.State] = r;
      return out;
    }, {} as { [key: string]: StateDataResult });

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

    console.log(`writing ./src/states.ts...`);
    fs.writeFileSync(path.join(__dirname, '../src/states.ts'), code);
  }
  process.exit(0);
}

export async function prepStateData() {}
