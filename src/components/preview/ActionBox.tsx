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

const Style = styled('div')<{palette: IPalette}>`
  width: 640px;
  height: 640px;
  border: 4px solid red;
  color: ${props => props.palette.color};
  background-color: ${props => props.palette.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Text1 = styled('div')`
  font-size: 1.5em;
  height: 1.5em;
  width: 100%;
`;

const Text2 = styled('div')`
  font-size: 1em;
  height: 1em;
  width: 100%;
`;

const Centered = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
`;

const StyledImg = styled('img')`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 12px;
`;

const Fuse = styled('div')<{palette: IPalette}>`
  width: 100%;
  height: 1em;
  background-color: ${props => props.palette.alternativeColor};
  margin-top: 12px;
`;

const WaterMark = styled('div')<{palette: IPalette}>`
  color: ${props => props.palette.color};
  margin-top: 12px;
  width: 100%;
  font-size: 1em;
`;

export const ActionBox = enhance(props => (
  <Style palette={props.palette}>
    <Centered>
      <Text1>
        night time blues
      </Text1>
      <Text2>
        casteluzzo
      </Text2>
      <StyledImg src={props.src} />
      <Fuse palette={props.palette} />
      <WaterMark palette={props.palette}>@jaredplaysguitar</WaterMark>
    </Centered>
  </Style>
));
