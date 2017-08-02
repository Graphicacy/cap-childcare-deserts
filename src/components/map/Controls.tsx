import { createElement } from 'react';
import { style } from 'typestyle';
import { connect } from 'react-redux';
import { State, Dispatch } from '../../store';

const controlClass = style({
  position: 'absolute',
  top: 0
});

type ControlProps = Readonly<{
  embed?: boolean;
}>;

const Controls = (props: ControlProps) =>
  <div className={controlClass}>TEST</div>;

const mapStateToProps = (state: State) => {
  return {
    embed: state.embed
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
