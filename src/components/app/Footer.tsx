import { Divider, Layout } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';

const ContentCentered = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = () => (
  <Layout.Footer>
    <ContentCentered>
      <a href="https://instagram.com/jaredplaysguitar">
        @jaredplaysguitar
      </a>
      <Divider type="vertical" />
      <a href="https://jaredcodes.com">
        jaredcodes.com
      </a>
    </ContentCentered>
  </Layout.Footer>
);
