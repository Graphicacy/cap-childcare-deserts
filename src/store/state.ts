import { StateName } from '../data';
import { UrbanicityFilter } from './actions';

/**
 * type describing the entire app state
 */
export type State = Readonly<{
  /**
   * selected us state (with data), or 'All states'
   */
  selectedState: StateName;
  /**
   * mapbox has loaded tiles
   */
  mapReady: boolean;
  /**
   * ?embed=true query string present
   */
  embed: boolean;
  /**
   * tooltip position + hide/show data
   */
  tooltip: TooltipState;
  /**
   * urbanicity filter button state (when state is selected)
   */
  urbanicityFilter: UrbanicityFilter;
  /**
   * whether the size of the screen should
   * result in mobile / desktop view
   */
  mobile: boolean;
  /**
   * article focus active
   */
  articleFocus: boolean;
  /**
   * mapbox position information
   */
  mapTarget: {
    zoom: [number];
    center: [number, number];
  };
  /**
   * mouse position information
   */
  mouse: {
    x: number;
    y: number;
  };
}>;

export type TooltipState = TooltipHideState | TooltipShowState;

export interface TooltipHideState {
  show: false;
}

export interface TooltipShowState {
  data: ToolTipData;
  show: true;
}

export type ToolTipData =
  | TractToolTipData
  | StateToolTipData
  | ChartToolTipData;

export interface ChartToolTipData {
  kind: 'chart';
  properties: {
    label: string;
    value: string;
  };
}

export interface TractToolTipData {
  kind: 'tract';
  properties: TractProperties;
}

export interface StateToolTipData {
  kind: 'state';
  properties: {
    state: StateName;
  };
}

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
