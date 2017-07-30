import { createElement } from 'react';
import { connect } from 'react-redux';
import { style } from 'typestyle';
import { content, flex } from 'csstips';

import Title from './Title';
import { StateBarChart } from '../charts/';
import { StateName } from '../../data';
import { State } from '../../store/';

const articleClass = style(content, {
  textAlign: 'left',
  maxWidth: 900,
  margin: '0 auto'
});

const articleContainerClass = style(flex, {
  borderTop: '1px solid #ccc',
  padding: 60
});

const stateBarChartClass = style(content, {
  maxWidth: 600,
  margin: '0 auto',
  textAlign: 'center'
});

type ArticleProps = Readonly<{ selectedState: StateName | null }>;

const Article = ({ selectedState }: ArticleProps) =>
  <div className={articleContainerClass}>
    <div className={stateBarChartClass}>
      <StateBarChart selectedState={selectedState} />
    </div>
    <div className={articleClass}>
      <Title> About the Study </Title>
      <p>
        Derat. Bea quodi blanimi nullabo. Bus estecte molorro qui sin reris
        etur? Re am consed que dolut lam erum quate velenisti dolora nimporiti o
        ctiis et ipid quis nissinciae cum verem dit, nobitatecto o cid ullaut
        occab ipsaper sperum nobitatemqui dolestisi desequam aut es eostiae
        caboreritas min- vers perenient eturepuda ipisimus ut lab il et eaqui
        oUllector esequi rem aliquae nis dolorist volupta ectiunt quo mi,
        consectio blaceste aliquos eaque et, o c totatus citibus sandisini autem
        fuga. Ur, voluptatur accuptusdant occuptur rem etustis.
      </p>
      <p>
        Hendam et pel im quodi idignamet que nobis velent lam, volupta num exero
        optae corrumq uiatu- scieni rem nis re in ped qui beatibea quam, niae
        exererum velectur? Qui vollor aut volore occabore rem quibeatecat
        disquat quiantis et lab iment ut in rerferferis ex et idel ilignam
        evelestibus si qui cus sim enit, conseque moloreprati autatem.
      </p>
      <p>
        Et vel minctota dem harum que nam iur mi, exeriam sed magnim et mi,
        quiam si optaturiate volup- tassi blandis se volut assequis recabor
        eperspel ma quod ut lab ius as qui reribus, eatem que vent et alicius
        dia voluptur acestium hilignatio. Nemodis exceaquae res id quideli
        tionecum rempor aut inve- leseque nonseque volupta sed expedis deniento
        conet, sunt et faccatur si occati nimpore henihit pra anda volum eum sum
        ipis erectiat laniatem rentet fugiatiam dio veniend eliberia
      </p>
    </div>
  </div>;

export default connect((state: State) => ({
  selectedState: state.selectedState
}))(Article);
