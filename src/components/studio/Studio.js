import React from 'react';
import styled from 'styled-components';
import { Page } from '../';
import html2canvas from 'html2canvas'
import { compose, withState, lifecycle } from 'recompose';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      const html = window.$('#html-page-content')[0];
      let dest = window.$('#canvas-page-content canvas')[0];

      window.$('#bar').animate({
        width: '100%'
      }, 5000);

      const drawFrame = () => {
        html2canvas(html, { useCORS: true }).then(canvas => {
          dest.replaceWith(canvas);
          dest = canvas;
        });

        window.requestAnimationFrame(drawFrame);
      }

      window.requestAnimationFrame(drawFrame);
    }
  })
);

const StudioOuter = styled.div`
`;
const StudioInner = styled.div`
`;
const Book = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Controls = styled.div`
  border: 1px solid red;
`;
const Bar = styled.div`
  height: 20px;
  background: salmon;
  width: 0%;
`;

const Studio = ({ width }) => (
  <StudioOuter>
    <StudioInner>
      <Book>
        <Page
          title="html"
          innerId="html-page-content"
        >
          Test1
          <Bar id="bar" />
        </Page>
        <Page
          title="canvas"
          innerId="canvas-page-content"
        >
          <canvas />
        </Page>
      </Book>
    </StudioInner>
  </StudioOuter>
);

export default enhance(Studio);
