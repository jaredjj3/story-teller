import { Layout, Row, Col } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';
import { Editor, Preview } from 'components';
import { THEME } from 'constants/index';

const Style = styled('div')`
  min-height: 100vh;
  margin: 0 auto;
  max-width: ${() => THEME.maxWidth};
  margin-top: 24px;
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
