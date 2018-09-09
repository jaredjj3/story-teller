import * as React from 'react';
import { ContentContext } from '../app/Content';
import styled from 'react-emotion';

const Style = styled('div')`
  padding-left: 12px;
`;

export const Preview = () => (
  <Style>
    <ContentContext.Consumer>
      {
        ctx => (
          <div>
            <h1>{ctx.imgSrc}</h1>
          </div>
        )
      }
    </ContentContext.Consumer>
  </Style>
);
