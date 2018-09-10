import * as React from 'react';
import { ContentContext } from '../app/Content';

export const Palette = () => (
  <ContentContext.Consumer>
    {
      ctx => (
        <div>
          <h1>{ctx.color}</h1>
          <h1>{ctx.backgroundColor}</h1>
          <h1>{ctx.alternativeColor}</h1>
        </div>
      )
    }
  </ContentContext.Consumer>
);