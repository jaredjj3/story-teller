import * as React from 'react';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { IPalette } from '../../types/palette';

interface IOuterProps {
  src: string;
  progress: number;
  palette: IPalette;
  text1: string;
  text2: string;
}

const enhance = compose<IOuterProps, IOuterProps>(

);

const Style = styled('div') <{ palette: IPalette }>`
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

const FuseContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  height: 1em;
`;

const ReverseFuse = styled('div')<{ palette: IPalette, progress: number }>`
  width: ${props => props.progress * 100}%;
  background-color: ${props => props.palette.color};
`

const Fuse = styled('div')<{ palette: IPalette, progress: number }>`
  width: ${props => 100 - (props.progress * 100)}%;
  background-color: ${props => props.palette.alternativeColor};
`;

const WaterMark = styled('div') <{ palette: IPalette }>`
  color: ${props => props.palette.color};
  margin-top: 12px;
  width: 100%;
  font-size: 1em;
`;

export const ActionBox = enhance(props => (
  <Style palette={props.palette}>
    <Centered>
      <Text1>
        {props.text1}
      </Text1>
      <Text2>
        {props.text2}
      </Text2>
      <StyledImg src={props.src} />
      <FuseContainer>
        <ReverseFuse
          palette={props.palette}
          progress={props.progress}
        />
        <Fuse
          palette={props.palette}
          progress={props.progress}
        />
      </FuseContainer>
      <WaterMark palette={props.palette}>@jaredplaysguitar</WaterMark>
    </Centered>
  </Style>
));
