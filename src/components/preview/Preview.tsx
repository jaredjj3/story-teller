import * as React from 'react';
import { ContentContext } from '../app/Content';
import styled from 'react-emotion';

const SIZE = '480px';

const Style = styled('div')`
  padding-left: 12px;
`;

const ImgContainer = styled('div')`
  width: ${() => SIZE};
  height: ${() => SIZE};
`;

const OuterImg = styled('img')`
  width: ${() => SIZE};
  height: ${() => SIZE};
  border: 4px solid lime;
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
