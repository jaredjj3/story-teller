import { Layout } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';
import { THEME } from 'constants/index';

const Style = styled('div')`
  color: white;
  font-weight: lighter;
  font-size: 24px;
  letter-spacing: 2px;
  margin: 0 auto;
  max-width: ${() => THEME.maxWidth};
`;

export const Header = () => (
  <Layout.Header>
    <Style>
      story teller ✨
    </Style>
  </Layout.Header>
);
