import { createElement } from 'react';
import { style, media } from 'typestyle';
import { connect } from 'react-redux';
import { State, Dispatch, setUrbanFilter, UrbanicityFilter } from '../../store';
import { Colors } from '../colors';
import { TRACT_CONTROL_INDENT } from './tracts';

const noop = () => {};

const controlClass = style({
  position: 'absolute',
  top: 110,
  left: TRACT_CONTROL_INDENT,
  zIndex: 2
});

const buttonClass = style(
  {
    display: 'inline-block',
    textTransform: 'uppercase',
    width: 90,
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: 12,
    height: '26px',
    lineHeight: '26px'
  },
  media(
    { maxWidth: 768 },
    {
      fontSize: 10,
      width: 70
    }
  )
);

type ControlProps = Readonly<{
  embed?: boolean;
  handler(filter: UrbanicityFilter): () => void;
  isActive(filter: UrbanicityFilter): boolean;
}>;

const Button = (props: { onClick?(): void; text: string; active?: boolean }) =>
  <div
    className={buttonClass}
    style={{
      backgroundColor: props.active ? Colors.ACTIVE_CONTROL : 'white',
      color: !props.active ? Colors.ACTIVE_CONTROL : 'white',
      border:
        '1px solid ' + (!props.active ? Colors.GRAY : Colors.ACTIVE_CONTROL)
    }}
    onClick={props.onClick || noop}
  >
    {props.text}
  </div>;

const Controls = (props: ControlProps) =>
  <div className={controlClass}>
    <Button
      text="all"
      active={props.isActive(UrbanicityFilter.ALL)}
      onClick={props.handler(UrbanicityFilter.ALL)}
    />
    <Button
      text="rural"
      active={props.isActive(UrbanicityFilter.RURAL)}
      onClick={props.handler(UrbanicityFilter.RURAL)}
    />
    <Button
      text="suburban"
      active={props.isActive(UrbanicityFilter.SUBURBAN)}
      onClick={props.handler(UrbanicityFilter.SUBURBAN)}
    />
    <Button
      text="urban"
      active={props.isActive(UrbanicityFilter.URBAN)}
      onClick={props.handler(UrbanicityFilter.URBAN)}
    />
  </div>;

const mapStateToProps = (state: State) => {
  return {
    embed: state.embed,
    isActive(filter: UrbanicityFilter) {
      return state.urbanicityFilter === filter;
    }
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handler(filter: UrbanicityFilter) {
    return () => dispatch(setUrbanFilter(filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
