import { StateName } from '../../data';

export const TRACT_CONTROL_INDENT = 40;
export const tractLayers = ['tl-2016-06-tract'];

export function getTractLayerForState(state: StateName) {
  switch (state) {
    case 'California':
      return 'tl-2016-06-tract';
  }
}
