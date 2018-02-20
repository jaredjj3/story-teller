import React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import html2canvas from 'html2canvas'
import $ from 'jquery';
import ImagePalette from 'react-image-palette';
import { Content, Theme, Preview, Palette } from '../';
import { Row, Col } from 'reactstrap';

const DEFAULT_PALETTE = Object.freeze({
  backgroundColor: '#ffffff',
  color: '#222222',
  alternativeColor: '#efefef'
});

const enhance = compose(
  withState('text1', 'setText1', 'The Less I Know the Better'),
  withState('text2', 'setText2', 'Tame Impala'),
  withState('textSize1', 'setTextSize1', '1'),
  withState('textSize2', 'setTextSize2', '5'),
  withState('background', 'setBackground', '#ffffff'),
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

const Studio = props => (
  <div>
    <Row>
      <Col xs={6} md={6} lg={6}>
        <Content {...props} />
        <br/>
        <Theme {...props} />
        <br/>
        <ImagePalette
          crossOrigin
          image={props.imgSrc}
          render={Palette}
          default={{ DEFAULT_PALETTE }}
        />
      </Col>
      <Col xs={6} md={6} lg={6}>
        <Preview {...props} />
      </Col>
    </Row>
    <hr/>
  </div>
);

export default enhance(Studio);
