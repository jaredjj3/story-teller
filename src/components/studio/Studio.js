import React from 'react';
import styled from 'styled-components';
import { Page } from '../';
import html2canvas from 'html2canvas'
import { compose, withState, lifecycle } from 'recompose';
import $ from 'jquery';
import {
  Row, Col, Button, ButtonGroup, FormGroup, Label, Input,
  InputGroup, InputGroupAddon, InputGroupText, Alert
} from 'reactstrap';

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

const Book = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;
const Controls = styled.div`
  border: 1px solid red;
`;
const Bar = styled.div`
  height: 20px;
  background: salmon;
`;
const AlertContent = styled.div`
  text-align: center;
`;

const Studio = ({ width }) => (
  <div>
    <Row>
      <Col xs={6} md={6} lg={6}>
        <FormGroup>
          <Label for="text-src">text</Label>
          <Input id="text-src" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="time-src">time</Label>
          <InputGroup>
            <Input id="time-src" type="number" />
            <InputGroupAddon addonType="append">ms</InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="img-src">img</Label>
          <Input id="img-src" type="text" />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col xs={6} md={6} lg={6} >
        <ButtonGroup>
          <Button outline color="primary">
            reset
          </Button>
          <Button outline color="primary">
            play
          </Button>
          <Button outline color="primary">
            record
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
    <hr/>
    <Alert>
      What up?
    </Alert>
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
  </div>
);

export default enhance(Studio);
