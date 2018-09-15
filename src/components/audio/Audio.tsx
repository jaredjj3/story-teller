import * as React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { Divider } from 'antd';
import styled from 'react-emotion';

interface IOuterProps {
  src: string;
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
    <audio id="main-audio" controls={true} src={props.src} />
  </Style>
));
