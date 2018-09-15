import * as React from 'react';
import { compose } from 'recompose';
import styled from 'react-emotion';

interface IOuterProps {
  src: string;
}

const enhance = compose<IOuterProps, IOuterProps>(

);

const Style = styled('div')`
  width: 640px;
  height: 640px;
  border: 3px solid red;
`

export const ActionBox = enhance(() => (
  <Style>
    foo bar
  </Style>
));
