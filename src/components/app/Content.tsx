import { Layout, Row, Col } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';
import { Editor } from '../editor';
import { Preview } from '../preview';

const Style = styled('div')`
  min-height: 100vh;
`;

export const Content = () => (
  <Layout.Content>
    <Style>
      <Row>
        <Col span={16}>
          <Editor />
        </Col>
        <Col span={8}>
          <Preview />
        </Col>
      </Row>
    </Style>
  </Layout.Content>
);
