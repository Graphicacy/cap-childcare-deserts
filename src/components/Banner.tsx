import * as React from 'react';
import { Title } from './Title';

export const Banner = () =>
  <div>
    <Title>
      {' '}40% of Americans in these states live in a child care desert.{' '}
    </Title>
    <p>
      A child care desert is any ZIP code with more than 30 children under age 5
      that contains either zero child care centers or so few centers that there
      are more than three times as many children as spaces in the centers.
    </p>
  </div>;
