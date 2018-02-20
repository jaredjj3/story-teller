import React from 'react';
import styled from 'styled-components';
import { Page } from '../';
import html2canvas from 'html2canvas'
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import $ from 'jquery';
import {
  Row, Col, Button, ButtonGroup, FormGroup, Label, Input,
  InputGroup, InputGroupAddon, FormText
} from 'reactstrap';

const enhance = compose(
  withState('text1', 'setText1', 'The Less I Know the Better'),
  withState('text2', 'setText2', 'Tame Impala'),
  withState('textSize1', 'setTextSize1', '1'),
  withState('textSize2', 'setTextSize2', '6'),
  withState('background', 'setBackground', '#ffffff'),
  withState('barBackground', 'setBarBackground', '#666666'),
  withState('color', 'setColor', '#222222'),
  withState('imgSrc', 'setImgSrc', 'https://i.scdn.co/image/c253c1f0eaf702620d45c1c7041d1ba161859b33'),
  withState('timeMs', 'setTimeMs', 5000),
  withState('playing', 'setPlaying', false),
  withState('storyType', 'setStoryType', 'personal'),
  withState('textAlign', 'setTextAlign', 'left'),
  withProps(props => ({
    innerStyle: {
      background: props.background,
      color: props.color
    },
    mainTag: `h${props.textSize1}`,
    subTag: `h${props.textSize2}`
  })),
  withProps(props => ({
    updateCanvas: () => {
      const html = $('#html-page-content')[0];
      let dest = $('#canvas-page-content canvas')[0];

      if (html && dest) {
        html2canvas(html, { useCORS: true, logging: false }).then(canvas => {
          dest.replaceWith(canvas);
          dest = canvas;
        });
      }
    }
  })),
  withHandlers({
    handleChange: props => setterName => event => {
      props[setterName](event.target.value);
    },
    handlePlayClick: props => event => {
      props.setPlaying(true);

      const bar = $('#bar');
      bar.stop();
      bar.width('300px');
      bar.animate({
        width: '0'
      }, parseInt(props.timeMs, 10), 'swing', () => {
        props.setPlaying(false);
        bar.stop();
      });
    },
    handleStopClick: props => event => {
      const bar = $('#bar');
      bar.stop();
      bar.animate({
        width: '300px'
      }, 50);
      props.setPlaying(false);
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.updateCanvas();
    },
    componentDidUpdate() {
      this.props.updateCanvas();
    }
  })
);

const Book = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;
const Bar = styled.div`
  height: 10px;
  margin: 0 auto;
  margin-top: 10px;
  width: 300px;
`;
const PageContent = styled.div`
  align-items: center;
  padding: 20px;

  h1, h2, h3, h4, h5, h6 {
    box-sizing: border-box;
    width: 300px;
  }

  img {
    width: 300px;
    margin: 0 auto;
  }
`;
const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
`;
const Watermark = styled.h6`
  margin-top: 20px;
`;

const Studio = props => (
  <div>
    <Row>
      <Col xs={4} md={4} lg={4}>
        <FormGroup>
          <Label for="text1">text1</Label>
          <Input
            id="text1"
            type="text1"
            value={props.text1}
            onChange={props.handleChange('setText1')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="text-size1">size1</Label>
          <Input
            id="text-size1"
            type="select"
            value={props.textSize1}
            onChange={props.handleChange('setTextSize1')}
          >
            <option value="1">xl</option>
            <option value="2">lg</option>
            <option value="3">md</option>
            <option value="4">sm</option>
            <option value="5">xs</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="text2">text2</Label>
          <Input
            id="text2"
            type="text2"
            value={props.text2}
            onChange={props.handleChange('setText2')}
          />
        </FormGroup>
        <FormGroup>
        <Label for="text-size2">size2</Label>
          <Input
            id="text-size2"
            type="select"
            value={props.textSize2}
            onChange={props.handleChange('setTextSize2')}
          >
            <option value="1">xl</option>
            <option value="2">lg</option>
            <option value="3">md</option>
            <option value="4">sm</option>
            <option value="5">xs</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="background">background</Label>
          <Input
            id="background"
            type="text"
            value={props.background}
            onChange={props.handleChange('setBackground')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="color">color</Label>
          <Input
            id="color"
            type="text"
            value={props.color}
            onChange={props.handleChange('setColor')}
          />
        </FormGroup>
      </Col>
      <Col xs={4} md={4} lg={4}>
      <FormGroup>
        <Label for="story-type">story type</Label>
          <Input
            id="story-type"
            type="select"
            value={props.storyType}
            onChange={props.handleChange('setStoryType')}
          > 
            <option value="personal">personal</option>
            <option value="string-sync">stringsync</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="time">time</Label>
          <InputGroup>
            <Input
              id="time"
              type="number"
              value={props.timeMs}
              onChange={props.handleChange('setTimeMs')}
            />
            <InputGroupAddon addonType="append">ms</InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="img">img</Label>
          <Input
            id="img"
            type="text"
            value={props.imgSrc}
            onChange={props.handleChange('setImgSrc')}
          />
          <FormText>
            https://www.stringsync.com/assets/logo/logo-04c8b7f1c8115db296e7163f467b89033f78cb423869f84710e49d2aa5f93147.png
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="bar-background">bar background</Label>
          <Input
            id="bar-background"
            type="text"
            value={props.barBackground}
            onChange={props.handleChange('setBarBackground')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="text-align">align</Label>
          <Input
            id="text-align"
            type="select"
            value={props.textAlign}
            onChange={props.handleChange('setTextAlign')}
          >
            <option value="left">left</option>
            <option value="center">center</option>
            <option value="right">right</option>
          </Input>
        </FormGroup>
      </Col>
    </Row>
    <hr/>
    <div>
      <Button
        outline
        block
        color={props.playing ? "danger" : "primary"}
        size="lg"
        onClick={props.playing ? props.handleStopClick : props.handlePlayClick}
      >
        {props.playing ? 'stop' : 'play'}
      </Button>
    </div>
    <Book>
      <Page
        title="html"
        innerId="html-page-content"
        innerStyle={props.innerStyle}
      >
        <PageContent style={{ textAlign: props.textAlign }}>
          <props.mainTag className={props.storyType}>{props.text1}</props.mainTag>
          <props.subTag className={props.storyType}>{props.text2}</props.subTag>
          <Centered>
            {props.imgSrc.length > 0 ? <img src={props.imgSrc} alt="" /> : null}
          </Centered>
          <Bar id="bar" style={{ background: props.barBackground}} />
          <Watermark className={props.storyType}>
            @{props.storyType === 'personal' ? 'jaredplaysguitar' : 'stringsynced'}
          </Watermark>
        </PageContent>
      </Page>
      {/* Uncomment to enable html2canvas
        <Page
        title="canvas"
        innerId="canvas-page-content"
        >
          <canvas />
        </Page>
      */}
    </Book>
  </div>
);

export default enhance(Studio);
