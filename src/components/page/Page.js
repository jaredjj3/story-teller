import React from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';

const enhance = compose(

);

const Page = ({ children }) => (
  <span>
    {children}
  </span>
);

export default enhance(Page);