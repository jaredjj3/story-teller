import * as React from 'react';
import { Row, Col } from 'antd';
import styled from 'react-emotion';
import { Preview } from '../preview';
import { compose, withState } from 'recompose';

interface IWithStateProps {
  src: string;
  setSrc: (src: string) => void;
}

const enhance = compose<IWithStateProps, {}>(
  withState('src', 'setSrc', 'https://i.scdn.co/÷÷÷/66e9cdf5889a43b97f9e6b5b0641b74b5a201759')
);

const Style = styled('div')`
  padding-right: 12px;
`;

export const Editor = enhance(props => (
  <Style>
    <Row>
      <Col span={6}>
        Editor
      </Col>
      <Col span={18}>
        <Preview src={props.src} />
      </Col>
    </Row>
  </Style>
));
