import * as React from 'react';
import { compose, branch, renderNothing, withHandlers, withState } from 'recompose';
import styled from 'react-emotion';
import { loop } from 'enhancers/loop';

interface IOuterProps {
  src: string;
  onPlay: () => void;
  onPause: () => void;
  syncCurrentTimeMs: (timeMs: number) => void;
}

interface IWithStateProps extends IOuterProps {
  audioElement: HTMLAudioElement | null;
  setAudioElement: (audioElement: HTMLAudioElement | null) => void;
}

interface IWithHandlerProps extends IWithStateProps {
  handlePlay: () => void;
  handlePause: () => void;
  handleAudioRef: (ref: HTMLAudioElement) => void;
}

const enhance = compose <IWithHandlerProps, IOuterProps>(
  withState('audioElement', 'setAudioElement', null),
  withHandlers({
    handleAudioRef: (props: IWithStateProps) => (ref: HTMLAudioElement) => {
      props.setAudioElement(ref || null);
    },
    handlePlay: (props: IWithStateProps) => () => {
      props.onPlay();
      
      if (!props.audioElement) {
        return;
      }

      props.audioElement.currentTime = 0;
    },
    handlePause: (props: IWithStateProps) => () => {
      props.onPause();
      
      if (!props.audioElement) {
        return;
      }

      props.audioElement.currentTime = 0;
    },
  }),
  loop<IWithHandlerProps>(props => {
    if (!props.audioElement) {
      return;
    }

    props.syncCurrentTimeMs(props.audioElement.currentTime * 1000);
  }),
  branch<IOuterProps>(props => !props.src, renderNothing)
);

const Style = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

export const Audio = enhance(props => (
  <Style>
    <audio
      ref={props.handleAudioRef}
      onPlay={props.handlePlay}
      onPause={props.handlePause}
      controls={true}
      src={props.src}
    />
  </Style>
));
