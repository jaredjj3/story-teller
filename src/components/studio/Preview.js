import React from 'react';
import styled from 'styled-components';
import { Page } from '../';
import { Button } from 'reactstrap';

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

const Preview = props => (
  <div>
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
              style={{ background: props.color }}
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
  </div>
);

export default Preview;
