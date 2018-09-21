import * as React from 'react';
import { compose, branch, renderComponent, withProps } from 'recompose';
import { IPalette } from 'types/palette';
import { TextSlide } from './TextSlide';
import { SongSlide } from './SongSlide';
import styled from 'react-emotion';

interface IOuterProps {
  src: string;
  progress: number;
  palette: IPalette;
  artistName: string;
  songName: string;
  text1: string;
  text2: string;
}

interface IInnerProps extends IOuterProps {
  isSongSlideVisible: boolean;
}

const enhance = compose<IInnerProps, IOuterProps>(
  withProps((props: IOuterProps) => ({
    isSongSlideVisible: props.text1.length > 0 && props.text2.length > 0,
  }))
);

const ToggleVisibility = styled('div')<{ visible: boolean }>`
  display: ${props => props.visible ? 'block' : 'none'};
`;

export const ActionBoxContent = enhance(props => (
  <div>
    <ToggleVisibility visible={props.isSongSlideVisible}>
      <SongSlide
        src={props.src}
        progress={props.progress}
        palette={props.palette}
        artistName={props.artistName}
        songName={props.songName}
      />
    </ToggleVisibility>
    <ToggleVisibility visible={!props.isSongSlideVisible}>
      <TextSlide text={props.text1} />
    </ToggleVisibility>
  </div>
));
