import { Layout } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';

const Style = styled('div')`
  color: white;
  font-weight: lighter;
  font-size: 24px;
  letter-spacing: 2px;
`;

export const Header = () => (
  <Layout.Header>
    <Style>
      story teller ✨
    </Style>
  </Layout.Header>
);
