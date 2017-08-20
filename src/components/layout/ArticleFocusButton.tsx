import { createElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch, focusArticle, State } from '../../store';
import { Info } from './Icons';

interface ArticleFocusButtonProps {
  className: string;
  scrollToArticle(): void;
}

const ArticleFocusButton: React.StatelessComponent<
  ArticleFocusButtonProps
> = props =>
  <span className={props.className} onClick={props.scrollToArticle}>
    About the Data <Info />
  </span>;

export default connect(
  (state: State, ownProps: { className: string }) => ownProps,
  (dispatch: Dispatch) => ({
    scrollToArticle() {
      dispatch(focusArticle());
    }
  })
)(ArticleFocusButton);
