import * as React from 'react';
import { ContentContext } from '../app/Content';
import styled from 'react-emotion';

const SIZE = '640px';

const Style = styled('div')`
  padding-left: 12px;
`;

const ImgContainer = styled('div')`
  width: ${() => SIZE};
  height: ${() => SIZE};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid lime;
  background-image: linear-gradient(red, yellow);
`;

const OuterImg = styled('img')`
  height: 240px;
  width: 240px;
`;

export const Preview = () => (
  <Style>
    <ContentContext.Consumer>
      {
        ctx => (
          <ImgContainer>
            <OuterImg src={ctx.imgSrc} />
          </ImgContainer>
        )
      }
    </ContentContext.Consumer>
  </Style>
);
