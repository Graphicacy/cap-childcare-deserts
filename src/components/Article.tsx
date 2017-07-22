import * as React from 'react';
import { style } from 'typestyle';

const articleClass = style({
  borderTop: '1px solid #ccc',
  padding: 60,
  textAlign: 'left'
});

const headerClass = style({
  fontWeight: 'bold',
  textAlign: 'center',
  width: '100%',
  fontSize: 20,
  marginBottom: 20
});

export const Article = () =>
  <div className="columns">
    <div className={`column col-12 ${articleClass}`}>
      <div className={headerClass}>About the Study</div>
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
