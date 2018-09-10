import * as React from 'react';
import { Row, Col } from 'antd';
import styled from 'react-emotion';
import { Preview } from '../preview';

const Style = styled('div')`
  padding-right: 12px;
`;

export const Editor = () => (
  <Style>
    <Row>
      <Col span={6}>
        Editor
      </Col>
      <Col span={18}>
        <Preview />
      </Col>
    </Row>
  </Style>
);
