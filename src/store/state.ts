import { StateName } from '../data';

/**
 * type describing the entire app state
 */
export type State = Readonly<{
  selectedState: StateName;
  embed: boolean;
  zoom: [number];
  center: [number, number];
  tooltip: TooltipState;
}>;

export type TooltipState = TooltipHideState | TooltipShowState;

export type TooltipHideState = {
  show: false;
};

export type TooltipShowState = {
  x: number;
  y: number;
  data: ToolTipData;
  show: true;
};

export type ToolTipData = TractToolTip | StateToolTip | ChartToolTip;

export type ChartToolTip = {
  kind: 'chart';
  properties: {};
};

export type TractToolTip = {
  kind: 'tract';
  properties: {};
};

export type StateToolTip = {
  kind: 'state';
  properties: {
    abbr: string;
  };
};
