import * as React from 'react';
import { compose, branch, renderNothing, withHandlers, withState } from 'recompose';
import styled from 'react-emotion';
import { loop } from 'enhancers/loop';
import { Button, Icon } from 'antd';

interface IOuterProps {
  src: string;
  onPlay: () => void;
  onPause: () => void;
  onCurrentTimeMsChange: (timeMs: number) => void;
  onDurationMsChange: (durationMs: number) => void;
}

interface IWithStateProps extends IOuterProps {
  audioElement: HTMLAudioElement | null;
  setAudioElement: (audioElement: HTMLAudioElement | null) => void;
}

interface IWithHandlerProps extends IWithStateProps {
  handlePlayFromBeginning: () => void;
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
    handlePlayFromBeginning: (props: IWithStateProps) => () => {
      const { audioElement } = props;

      if (!audioElement) {
        return;
      }
      
      audioElement.currentTime = 0;
      audioElement.pause();
      props.onPause();
      window.setTimeout(() => audioElement.play(), 500);
    },
    handlePlay: (props: IWithStateProps) => () => {
      props.onPlay();
    },
    handlePause: (props: IWithStateProps) => () => {
      props.onPause();
    },
  }),
  branch<IOuterProps>(props => !props.src, renderNothing),
  loop<IWithHandlerProps>(props => {
    if (!props.audioElement) {
      return;
    }

    props.onCurrentTimeMsChange(props.audioElement.currentTime * 1000);
    props.onDurationMsChange(props.audioElement.duration * 1000);
  }),
);

const Style = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export const Audio = enhance(props => (
  <Style>
    <Button type="primary" onClick={props.handlePlayFromBeginning}>
      <Icon type="caret-right" /> from beginning
    </Button>
    <audio
      ref={props.handleAudioRef}
      onPlay={props.handlePlay}
      onPause={props.handlePause}
      controls={true}
      src={props.src}
    />
  </Style>
));
