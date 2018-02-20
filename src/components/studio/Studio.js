import React from 'react';
import styled from 'styled-components';
import { Page, Content, Theme } from '../';
import html2canvas from 'html2canvas'
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import $ from 'jquery';
import {
  Row, Col, Button, FormGroup, Label, Input,
  InputGroup, InputGroupAddon
} from 'reactstrap';

const enhance = compose(
  withState('text1', 'setText1', 'The Less I Know the Better'),
  withState('text2', 'setText2', 'Tame Impala'),
  withState('textSize1', 'setTextSize1', '1'),
  withState('textSize2', 'setTextSize2', '5'),
  withState('background', 'setBackground', '#ffffff'),
  withState('color', 'setColor', '#222222'),
  withState('imgSrc', 'setImgSrc', ''), // 'https://i.scdn.co/image/c253c1f0eaf702620d45c1c7041d1ba161859b33'),
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
      }, parseInt(props.timeMs, 10), 'linear', () => {
        props.setPlaying(false);
        bar.stop();
      });
    },
    handleStopClick: props => event => {
      const bar = $('#bar');
      bar.stop();
      bar.animate({
        width: '0'
      }, 50);
      props.setPlaying(false);
    },
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
`;
const BarContainer = styled.div`
  height: 20px;
`;
const Bar = styled.div`
  height: 10px;
  ${props => {
    let style;

    if (props.textAlign === 'center') {
      style = 'margin: 0 auto;';
    } else {
      style = `float: ${props.textAlign};`
    }

    return style;
  }}
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
const ButtonContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 360px;
`;

const Studio = props => (
  <div>
    <Row>
      <Col xs={6} md={6} lg={6}>
        <Content {...props} />
        <br/>
        <Theme {...props} />
      </Col>
      <Col xs={6} md={6} lg={6}>
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
              <BarContainer>
                <Bar 
                  id="bar"
                  style={{ background: props.color}}
                  textAlign={props.textAlign}
                />
              </BarContainer>
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
          <ButtonContainer>
            <Button
              outline
              block
              color={props.playing ? "danger" : "primary"}
              size="lg"
              onClick={props.playing ? props.handleStopClick : props.handlePlayClick}
            >
              {props.playing ? 'stop' : 'play'}
          </Button>
        </ButtonContainer>
      </Col>
    </Row>
    <hr/>
  </div>
);

export default enhance(Studio);
