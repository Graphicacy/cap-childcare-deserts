import * as csv from 'csv-parse';
import * as commander from 'commander';

if (require.main === module) run().catch(console.error);

export async function run() {
  const program = commander
    .usage('[options] <csvfiles>')
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option(
      '-c, --cheese [type]',
      'Add the specified type of cheese [marble]',
      'marble'
    )
    .parse(process.argv);
}

export async function prepStateData() {}
