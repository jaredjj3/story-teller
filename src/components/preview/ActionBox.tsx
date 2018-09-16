import * as React from 'react';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { IPalette } from '../../types/palette';

interface IOuterProps {
  src: string;
  progress: number;
  palette: IPalette;
  artistName: string;
  songName: string;
  text1: string;
  text2: string;
}

const getFontSize = (strLength: number) => {
  if (strLength < 22) {
    return 1
  } else if (strLength < 44) {
    return 0.75;
  } else if (strLength < 64) {
    return 0.66;
  } else {
    return 0.5;
  }
};

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

const Centered = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 66%;
  margin: 0 auto;
`;

const TextContainer = styled('div')`
  width: 100%;
  position: relative;
`;

const TextSpacer = styled('div')`
  opacity: 0;
`;

const VisibleText = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
`;

const Text1 = styled('div') <{ length: number }>`
  font-size: ${props => getFontSize(props.length) * 3}em;
  width: 100%;
`;

const Text2 = styled('div') <{ length: number }>`
  font-size: ${props => getFontSize(props.length) * 2}em;
  width: 100%;
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

const ReverseFuse = styled('div') <{ palette: IPalette, progress: number }>`
  width: ${props => props.progress * 100}%;
  background-color: ${props => props.palette.color};
`

const Fuse = styled('div') <{ palette: IPalette, progress: number }>`
  width: ${props => 100 - (props.progress * 100)}%;
  background-color: ${props => props.palette.alternativeColor};
`;

const WaterMark = styled('div') <{ palette: IPalette }>`
  color: ${props => props.palette.color};
  margin-top: 12px;
  width: 100%;
  font-size: 1.5em;
`;

export const ActionBox = enhance(props => (
  <Style palette={props.palette}>
    <Centered>
      <TextContainer>
        <TextSpacer>
          <Text1 length={props.songName.length}>
            {props.songName}
          </Text1>
          <Text2 length={props.songName.length}> {/* we purposefully base the length on songName */}
            {props.artistName}
          </Text2>
        </TextSpacer>
        <VisibleText>
          <Text1 length={props.text1.length}>
            {props.text1}
          </Text1>
          <Text2 length={props.text1.length}> {/* we purposefully base the length on text1 */}
            {props.text2}
          </Text2>
        </VisibleText>
      </TextContainer>
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
