import { Layout } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';

const Style = styled('div')`
  color: white;
  font-weight: 100;
`;

export const Header = () => (
  <Layout.Header>
    <Style>
      story teller
    </Style>
  </Layout.Header>
);
