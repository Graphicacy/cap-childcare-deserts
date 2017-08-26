import { content, flex, horizontal } from 'csstips';
import { style } from 'typestyle';

export const contentClass = style(content);
export const flexClass = style(flex);
export const horizontalFlexClass = style(flex, horizontal);
export const containerClass = style(flex, horizontal, {
  maxWidth: 370,
  margin: '0 auto',
  $nest: {
    '>:first-child': {
      paddingLeft: '16.66%'
    },
    '>:last-child': {
      paddingRight: '16.66%'
    }
  }
});

export const barChartTitleClass = style({
  fontWeight: 'bold',
  fontSize: 14,
  width: '100%',
  textAlign: 'center',
  marginBottom: 20
});

export const donutTitleClass = style({
  textAlign: 'center',
  width: '100%'
});

export const percentClass = style({
  fontFamily: 'Open Sans'
});
