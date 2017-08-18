import { StateName } from '../data';
import { UrbanicityFilter } from './actions';
/**
 * type describing the entire app state
 */
export type State = Readonly<{
  selectedState: StateName;
  mapReady: boolean;
  embed: boolean;
  zoom: [number];
  center: [number, number];
  bounds: number[][] | null;
  tooltip: TooltipState;
  showLegend: boolean;
  urbanicityFilter: UrbanicityFilter;
  mobile: boolean;
  articleFocus: boolean;
  mouse: {
    x: number;
    y: number;
  };
}>;

export type TooltipState = TooltipHideState | TooltipShowState;

export type TooltipHideState = {
  show: false;
};

export type TooltipShowState = {
  data: ToolTipData;
  show: true;
};

export type ToolTipData =
  | TractToolTipData
  | StateToolTipData
  | ChartToolTipData;

export type ChartToolTipData = {
  kind: 'chart';
  properties: {
    label: string;
    value: string;
  };
};

export type TractToolTipData = {
  kind: 'tract';
  properties: TractProperties;
};

export type StateToolTipData = {
  kind: 'state';
  properties: {
    state: StateName;
  };
};

export interface TractProperties {
  STATEFP: string;
  COUNTYFP: string;
  TRACTCE: string;
  GEOID: string;
  NAME: string;
  NAMELSAD: string;
  MTFCC: string;
  FUNCSTAT: string;
  ALAND: number;
  AWATER: number;
  INTPTLAT: string;
  INTPTLON: string;
  state: string;
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
