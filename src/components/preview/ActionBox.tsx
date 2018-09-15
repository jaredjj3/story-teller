import * as React from 'react';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { IPalette } from '../../types/palette';

interface IOuterProps {
  src: string;
  palette: IPalette;
}

const enhance = compose<IOuterProps, IOuterProps>(

);

interface IStyleProps {
  palette: IPalette;
}

const Style = styled('div')<IStyleProps>`
  width: 640px;
  height: 640px;
  border: 3px solid red;
  color: ${props => props.palette.color};
  background-color: ${props => props.palette.backgroundColor};
`

const StyledImg = styled('img')`
  width: 50%;
  height: 50%;
`;

export const ActionBox = enhance(props => (
  <Style palette={props.palette}>
    <div>
      <StyledImg src={props.src} />
    </div>
  </Style>
));
