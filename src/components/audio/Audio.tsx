import * as React from 'react';
import { compose, branch, renderNothing } from 'recompose';

interface IOuterProps {
  src: string;
}

const enhance = compose <IOuterProps, IOuterProps>(
  branch<IOuterProps>(props => !props.src, renderNothing)
);

export const Audio = enhance(props => (
  <audio controls={true}>
    <source src={props.src} type="audio/mp4" />
  </audio>
));
