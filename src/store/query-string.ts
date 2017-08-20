export interface QueryParams {
  embed?: boolean;
}

export default function(): QueryParams {
  const result: { [key: string]: string } = {};
  const raw = location.search.slice(1).split('&').reduce((out, param) => {
    const [key, value] = param.split('=');
    out[key] = value;
    return out;
  }, result);

  return {
    embed: raw.embed === 'true'
  };
}
