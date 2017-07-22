import 'react-select/dist/react-select.css';
import * as React from 'react';
import * as Select from 'react-select';
import { style } from 'typestyle';
import { Title } from './Title';
import { stateList, StateName } from '../states';

const bannerClassName = style({
  marginBottom: 20,
  marginTop: 20
});

const selectContainerClass = style({
  width: '100%'
});

const selectClass = style({
  maxWidth: 300,
  width: '100%',
  margin: '0 auto'
});

export type BannerProps = Readonly<{
  selectedState?: StateName;
  onSelectState: (state: StateName | null) => void;
}>;

const options = stateList.map(s => ({ value: s, label: s }));

export const Banner = (props: BannerProps) =>
  <div className={bannerClassName}>
    <Title>
      {' '}40% of Americans in these states live in a child care desert.{' '}
    </Title>
    <p>
      A child care desert is any ZIP code with more than 30 children under age 5
      that contains either zero child care centers or so few centers that there
      are more than three times as many children as spaces in the centers.
    </p>
    <div className={selectContainerClass}>
      <Select
        className={selectClass}
        options={options}
        value={props.selectedState}
        onChange={s =>
          props.onSelectState(
            s && ((Array.isArray(s) ? s[0].value : s!.value) as StateName)
          )}
      />
    </div>
  </div>;
