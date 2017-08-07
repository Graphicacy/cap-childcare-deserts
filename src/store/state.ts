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
  properties: {
    // TODO: type
    data: any;
  };
};

export type StateToolTipData = {
  kind: 'state';
  properties: {
    state: StateName;
  };
};
