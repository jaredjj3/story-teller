import { Divider, Layout } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';
import { THEME } from 'constants/index';

const Centered = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: ${() => THEME.maxWidth};
`;

export const Footer = () => (
  <Layout.Footer>
    <Centered>
      <a href="https://instagram.com/jaredplaysguitar">
        @jaredplaysguitar
      </a>
      <Divider type="vertical" />
      <a href="https://jaredcodes.com">
        jaredcodes.com
      </a>
      <Divider type="vertical" />
      <a href="https://stringsync.com">
        stringsync.com
      </a>
    </Centered>
  </Layout.Footer>
);
