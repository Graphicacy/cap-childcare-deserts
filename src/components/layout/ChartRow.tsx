import { createElement } from 'react';
import { connect } from 'react-redux';
import { style, media } from 'typestyle';

import { StateName } from '../../data';
import { State, Dispatch, showTooltip, hideTooltip } from '../../store/';
import { EthnicityChart, IncomeChart, UrbanicityChart } from '../charts/';

/**
 * break between charts in columns and rows at 780px
 */
const chartContainerClass = style(
  {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 40,
    paddingTop: 0,
    maxWidth: 1200,
    margin: '0 auto'
  },
  media(
    { maxWidth: 780 },
    {
      $nest: {
        '& div': {
          marginBottom: 10
        }
      }
    }
  )
);

const chartClass = style({
  flexGrow: 1,
  // flexShrink: 0,
  flexBasis: 370,
  justifyContent: 'center'
});

const urbanicityStyle: React.CSSProperties = {
  maxWidth: 370,
  margin: '0 auto'
};

export type ChartsProps = Readonly<{
  selectedState: StateName;
  onMouseOut(): void;
  onMouseOver(value: string, label: string): void;
}>;

export const ChartRow = (props: ChartsProps) =>
  <div className={chartContainerClass}>
    <div className={chartClass}>
      <EthnicityChart {...props} style={urbanicityStyle} />
    </div>
    <div className={chartClass}>
      <UrbanicityChart {...props} style={urbanicityStyle} />
    </div>
    <div className={chartClass}>
      <IncomeChart {...props} />
    </div>
  </div>;

export default connect(
  (state: State) => ({
    selectedState: state.selectedState
  }),
  (dispatch: Dispatch) => {
    return {
      onMouseOver(value: string, label: string) {
        dispatch(showTooltip({ kind: 'chart', properties: { label, value } }));
      },
      onMouseOut() {
        dispatch(hideTooltip());
      }
    };
  }
)(ChartRow);
