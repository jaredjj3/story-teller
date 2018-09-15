import * as React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import styled from 'react-emotion';

interface IOuterProps {
  src: string;
  onPlay: () => void;
  onPause: () => void;
}

const enhance = compose <IOuterProps, IOuterProps>(
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
      onPlay={props.onPlay}
      onPause={props.onPause}
      controls={true}
      src={props.src}
    />
  </Style>
));
