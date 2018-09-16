import { Layout } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';
import { Editor } from 'components';
import { THEME } from 'constants/index';

const Style = styled('div')`
  min-height: 100vh;
  max-width: ${() => THEME.maxWidth};
  margin: 0 auto;
  padding-top: 50px;
`;

export const Content = () => (
  <Layout.Content style={{ padding: '0 50px' }}>
    <Style>
      <Editor />
    </Style>
  </Layout.Content>
);
