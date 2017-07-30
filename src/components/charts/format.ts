const { round } = Math;

/**
 * format number as percentage string
 *
 * @param n number to format
 */
export function percent(n: number) {
  return round(n * 100) + '%';
}

/**
 * add commas to number
 *
 * @param n number to format
 */
export function niceNumber(n: number) {
  return round(n).toString().split('').reduceRight(niceNumberBuilder);
}

function niceNumberBuilder(
  o: string,
  d: string,
  i: number,
  { length }: string[]
) {
  const p = length - i - 1;
  const comma = p && p % 3 === 0;
  return d + (comma ? ',' : '') + o;
}
