import React from 'react';
import { PageHeader } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import { Studio } from './components';

const fonts = css`
  .personal {
    font-family: 'Share Tech Mono', monospace;
  }

  .string-sync {
    font-family: Helvetica Neue, sans-serif;
    font-weight: 100;
  }
`;
const AppOuter = styled.div`
  max-width: 980px;
  margin: 0 auto;
  ${fonts}
`;
const AppInner = styled.div`
`;

const App = () => (
  <AppOuter>
    <AppInner>
      <header className="App-header">
        <PageHeader>
          story teller
        </PageHeader>
      </header>
      <main>
        <Studio />
      </main>
    </AppInner>
  </AppOuter>
);

export default App;
