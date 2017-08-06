declare const __ACCESS_TOKEN__: string;
export const accessToken = __ACCESS_TOKEN__;
export const mapboxStyle = 'mapbox://styles/bsouthga/cj5vvqe531xrr2stlbkoqrtmr';
export const startZoom = [3];
export const startCenter = [-100.343107, 38.424848];

export function getDataLayers(zoom: number[]) {
  return zoom[0] <= 6 ? ['tl-2016-06-tract'] : ['allstates'];
}
