export type QueryParams = {
  embed?: boolean;
};

export default function(): QueryParams {
  const raw = location.search.slice(1).split('&').reduce((out, param) => {
    const [key, value] = param.split('=');
    out[key] = value;
    return out;
  }, {} as { [key: string]: string });

  return {
    embed: raw.embed === 'true'
  };
}
