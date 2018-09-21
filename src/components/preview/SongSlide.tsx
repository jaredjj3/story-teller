import * as React from 'react';
import { IPalette } from 'types/palette';
import styled from 'react-emotion';

interface IProps {
  src: string;
  progress: number;
  palette: IPalette;
  artistName: string;
  songName: string;
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

const Text1 = styled('div') <{ length: number }>`
  font-size: ${props => getFontSize(props.length) * 3}em;
  width: 100%;
`;

const Text2 = styled('div') <{ length: number }>`
  font-size: ${props => getFontSize(props.length) * 2}em;
  width: 100%;
`;

const WaterMark = styled('div') <{ palette: IPalette }>`
  color: ${props => props.palette.color};
  margin-top: 12px;
  width: 100%;
  font-size: 1.5em;
`;

export const SongSlide: React.SFC<IProps> = props => (
  <div>
    <div>
      <Text1 length={props.songName.length}>
        {props.songName}
      </Text1>
      <Text2 length={props.songName.length}> {/* we purposefully base the length on songName */}
        {props.artistName}
      </Text2>
    </div>
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
  </div>
);