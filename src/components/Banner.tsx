import * as React from 'react';
import * as Select from 'react-select';
import 'react-select/dist/react-select.css';

import { style } from 'typestyle';
import { Title } from './Title';

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

export const Banner = ({
  onSelectState
}: {
  onSelectState: (state: string) => void;
}) =>
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
      <Select className={selectClass} />
    </div>
  </div>;
