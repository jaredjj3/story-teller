import { Layout } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';
import { THEME } from 'constants/index';

const Style = styled('div')`
  margin: 0 auto;
  max-width: ${() => THEME.maxWidth};
`;

const StyledH1 = styled('h1')`
  color: white;
`;

export const Header = () => (
  <Layout.Header>
    <Style>
      <StyledH1>story teller ✨</StyledH1>
    </Style>
  </Layout.Header>
);
