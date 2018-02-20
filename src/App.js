import React from 'react';
import styled, { css } from 'styled-components';
import { Studio } from './components';

const fonts = css`
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;

  h1, h2, h3 {
    font-weight: 300;
  }

  h4, h5, h6, p {
    font-weight: 100;
  }

  .personal {
    font-family: 'Share Tech Mono', monospace;
  }

  .string-sync {
    font-family: Helvetica Neue, sans-serif;

    h1, h2, h3 {
      font-weight: 100; 
    }
  }
`;
const AppOuter = styled.div`
  min-width: 700px;
  max-width: 980px;
  margin: 0 200px 200px 200px;

  ${fonts}
`;
const AppInner = styled.div`
  margin: 0 auto;
`;
const AppHeader = styled.header`
  margin-top: 20px;
`;

const App = () => (
  <AppOuter>
    <AppInner>
      <AppHeader className="App-header">
        <h1>story teller</h1>
        <p>tell stories. instagram stories.</p>
      </AppHeader>
      <hr/>
      <main>
        <Studio />
      </main>
    </AppInner>
  </AppOuter>
);

export default App;
