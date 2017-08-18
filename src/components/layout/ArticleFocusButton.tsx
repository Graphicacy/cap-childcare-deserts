import { createElement } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch, focusArticle } from '../../store';
import { Info } from './Icons';

type ArticleFocusButtonProps = {
  className: string;
  scrollToArticle(): void;
};

const ArticleFocusButton = (props: ArticleFocusButtonProps) =>
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
