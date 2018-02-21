import React from 'react';
import { compose, lifecycle } from 'recompose';
import styled from 'styled-components';
import { Page } from '../';
import { Button } from 'reactstrap';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      this.props.updateCanvas();
    }
  })
)

const Book = styled.div`
  display: flex;
  justify-content: space-around;
`;
const BarContainer = styled.div`
  margin-top: 10px;
  height: 20px;
  width: 300px;
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
`;
const Centered = styled.div`
  margin: 0 auto;
`;
const PageContentOuter = styled.div`
  width: 360px;
`;
const PageContentInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 640px;

  img {
    width: 300px;
  }
`;
const Watermark = styled.h6`
  margin-top: 20px;
  width: 300px;
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
        <PageContentOuter>
          <PageContentInner style={{ textAlign: props.textAlign }}>
            <Centered style={{ width: 300 }}>
              <props.mainTag className={props.storyType}>{props.text1}</props.mainTag>
              <props.subTag className={props.storyType}>{props.text2}</props.subTag>
            </Centered>
            <Centered>
              {props.imgSrc.length > 0 ? <img src={props.imgSrc} alt="" /> : null}
            </Centered>
            <Centered>
              <BarContainer>
                <Bar
                  id="bar"
                  style={{ background: props.altColor }}
                  textAlign={props.textAlign}
                />
              </BarContainer>
            </Centered>
            <Centered>
              <Watermark className={props.storyType}>
                @{props.storyType === 'personal' ? 'jaredplaysguitar' : 'stringsynced'}
              </Watermark>
            </Centered>
          </PageContentInner>
        </PageContentOuter>
      </Page>
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

export default enhance(Preview);
