import { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import * as zenscroll from 'zenscroll';

import { stateData, StateName } from '../../data';
import { Dispatch, focusArticleComplete, State } from '../../store/';
import { StateBarChart } from '../charts/';
import { Info } from './Icons';
import {
  anchorClass,
  articleClass,
  articleContainerClass,
  HEADER_HEIGHT,
  paragraphClass,
  ruleClass,
  stateBarChartClass
} from './styles';
import { VISUALS_SUPPORTED } from './SupportMessage';
import Title from './Title';

type ArticleProps = Readonly<{
  selectedState: StateName;
  active: boolean;
  deactivate(): void;
}>;

class Article extends Component<ArticleProps> {
  public componentDidMount() {
    const defaultDuration = 500;
    const edgeOffset = HEADER_HEIGHT;
    zenscroll.setup(defaultDuration, edgeOffset);
  }

  public componentDidUpdate() {
    this.ensureVisible();
  }

  /**
   * if a scroll event has been dispatched,
   * scroll the window to this element.
   */
  public ensureVisible() {
    const { active, deactivate } = this.props;
    if (active) {
      const node = findDOMNode(this);
      zenscroll.to(node);
      deactivate();
    }
  }

  public render() {
    const { selectedState } = this.props;
    return (
      <div className={articleContainerClass}>
        <hr className={ruleClass} />
        {VISUALS_SUPPORTED
          ? <div className={stateBarChartClass}>
              <StateBarChart selectedState={selectedState} />
            </div>
          : null}
        <div className={articleClass}>
          <Title>
            {' '}Child Care Access in{' '}
            {selectedState === 'All states' ? 'All States' : selectedState}{' '}
          </Title>
          {stateData[selectedState].textBox.split('PPP').map((par, index) =>
            <p
              className={index === 0 ? paragraphClass : ''}
              key={`${selectedState}-${index}`}
            >
              {par}
            </p>
          )}
          <p>
            <a href="https://www.americanprogress.org/?p=437988">Download the Report</a>
          </p>
          <Title> About the Data </Title>
          <p className={paragraphClass}>
            CAP collected data on the location and licensed capacity of nearly
            150,000 licensed or registered child care providers from 22 states.
            The authors included all child care centers; family child care
            providers; Head Start providers; and public and private preschools
            in these states in order to get a full picture of the supply of
            licensed child care options available to nearby communities.
          </p>
          <p>
            Each child care provider was geocoded based on the physical address
            provided on their license, giving the authors a precise latitude and
            longitude for every provider. In cases where the precise address was
            not available, the authors used the ZIP code to approximate the
            address. The authors then grouped providers by census tract and
            added up the total licensed capacity of the locations in each tract.
            This information was merged with a variety of census estimates on
            population demographics, population density, family income, poverty,
            and maternal labor force participation, among other variables. All
            data are publicly available, and a list of data sources and census
            variables can be found in the accompanying report’s Appendix.
          </p>
          <p>
            Using this original dataset, the authors applied the child care
            deserts definition to more than 45,000 census tracts, a geographic
            unit sometimes used by city planners to approximate neighborhoods.
            Census tracts generally have a population size of between 1,200 and
            8,000 people, with most tracts housing around 4,000 people. These
            geographic units usually cover a contiguous area, and their
            boundaries commonly follow identifiable features.
          </p>
          <a className={anchorClass} href="#" target="_blank">
            download the report <Info />
          </a>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: State) => {
    return {
      selectedState: state.selectedState,
      active: state.articleFocus
    };
  },
  (dispatch: Dispatch) => {
    return {
      deactivate() {
        dispatch(focusArticleComplete());
      }
    };
  }
)(Article);
