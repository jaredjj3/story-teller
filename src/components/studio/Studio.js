import React from 'react';
import styled from 'styled-components';
import { Page } from '../';

const StudioOuter = styled.div`
`;
const StudioInner = styled.div`
`;

const Studio = () => (
  <StudioOuter>
    <StudioInner>
      <Page />
      <Page />
    </StudioInner>
  </StudioOuter>
);

export default Studio;
