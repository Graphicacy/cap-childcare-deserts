import { createElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch, setUrbanFilter, State, UrbanicityFilter } from '../../store';
import { Colors } from '../colors';
import { buttonClass, controlClass } from './styles';
import { EMBED_TRACT_CONTROL_INDENT, TRACT_CONTROL_INDENT } from './tracts';

const noop = () => {}; // tslint:disable-line

const embedStyle = {
  left: EMBED_TRACT_CONTROL_INDENT
};

const nonEmbedStyle = {};

type ControlProps = Readonly<{
  embed?: boolean;
  filter: UrbanicityFilter;
  handler(filter: UrbanicityFilter): () => void;
}>;

const buttonStyleCache: { [key: string]: React.CSSProperties } = {};
const getButtonStyles = (active: boolean) => {
  const key = active.toString();
  if (key in buttonStyleCache) return buttonStyleCache[key];

  return (buttonStyleCache[key] = {
    backgroundColor: active ? Colors.ACTIVE_CONTROL : 'white',
    color: !active ? Colors.ACTIVE_CONTROL : 'white',
    border: '1px solid ' + (!active ? Colors.GRAY : Colors.ACTIVE_CONTROL)
  });
};

const Button: React.StatelessComponent<{
  onClick?(): void;
  text: string;
  active?: boolean;
}> = props =>
  <div
    className={buttonClass}
    style={getButtonStyles(!!props.active)}
    onClick={props.onClick || noop}
  >
    {props.text}
  </div>;

const Controls: React.StatelessComponent<ControlProps> = props =>
  <div
    className={controlClass}
    style={props.embed ? embedStyle : nonEmbedStyle}
  >
    <Button
      text="all"
      active={props.filter === UrbanicityFilter.ALL}
      onClick={props.handler(UrbanicityFilter.ALL)}
    />
    <Button
      text="rural"
      active={props.filter === UrbanicityFilter.RURAL}
      onClick={props.handler(UrbanicityFilter.RURAL)}
    />
    <Button
      text="suburban"
      active={props.filter === UrbanicityFilter.SUBURBAN}
      onClick={props.handler(UrbanicityFilter.SUBURBAN)}
    />
    <Button
      text="urban"
      active={props.filter === UrbanicityFilter.URBAN}
      onClick={props.handler(UrbanicityFilter.URBAN)}
    />
  </div>;

const mapStateToProps = (state: State) => {
  return {
    embed: state.embed,
    filter: state.urbanicityFilter
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handler(filter: UrbanicityFilter) {
    return () => dispatch(setUrbanFilter(filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
