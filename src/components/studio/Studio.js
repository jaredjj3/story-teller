import React from 'react';
import styled from 'styled-components';
import { Page } from '../';
import html2canvas from 'html2canvas'
import { compose, withState, lifecycle } from 'recompose';
import { Row, Col } from 'reactstrap';
import $ from 'jquery';

let rafId;

const enhance = compose(
  lifecycle({
    componentDidMount() {
      const html = $('#html-page-content')[0];
      let dest = $('#canvas-page-content canvas')[0];

      // $('#bar').animate({
      //   width: '80%'
      // }, 200, 'swing', () => {
      //   $('#bar').animate({
      //     width: '0%'
      //   }, 5000);
      // });

      // const drawFrame = () => {
      //   html2canvas(html, { useCORS: true }).then(canvas => {
      //     dest.replaceWith(canvas);
      //     dest = canvas;
      //   });
      
      //   rafId = window.requestAnimationFrame(drawFrame);
      // }

      // window.requestAnimationFrame(drawFrame);
    },
    componentWillUnmount() {
      window.cancelAnimationFrame(rafId);
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
`;

const Studio = ({ width }) => (
  <StudioOuter>
    <StudioInner>
      <Row>
        <Col xs={8} md={6} lg={4}>
          <p>Row 1</p>
        </Col>
      </Row>
      <Book>
        <Page
          title="html"
          innerId="html-page-content"
        >
          <h1 className="personal">Test1</h1>
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
