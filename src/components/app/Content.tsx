import { Layout } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';
import { Editor } from '../editor';

const Style = styled('div')`
  min-height: 100vh;
`;

export const Content = () => (
  <Layout.Content>
    <Style>
      <Editor />
    </Style>
  </Layout.Content>
);
