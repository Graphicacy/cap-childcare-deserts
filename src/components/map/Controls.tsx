import { createElement } from 'react';
import { style } from 'typestyle';

const controlClass = style({
  position: 'absolute',
  top: 0
});

const Controls = () => <div className={controlClass}>TEST</div>;

export default Controls;
