import { createElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch, setMousePosition, State } from '../store/';
import ToolTip from './_shared/ToolTip';
import { Container } from './layout/';
import { Map } from './map/';

type AppProps = Readonly<{
  embed: boolean;
  tooltipActive: boolean;
  onMouseMove<T>(e: React.MouseEvent<T>): void;
}>;

const App: React.StatelessComponent<AppProps> = props =>
  <div onMouseMove={e => props.tooltipActive && props.onMouseMove(e)}>
    {props.embed ? <Map /> : <Container />}
    <ToolTip />
  </div>;

export default connect(
  (state: State) => ({ embed: state.embed, tooltipActive: state.tooltip.show }),
  (dispatch: Dispatch) => ({
    onMouseMove<T>(e: React.MouseEvent<T>) {
      dispatch(setMousePosition(e.clientX, e.clientY));
    }
  })
)(App);
