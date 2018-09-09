import * as React from 'react';
import { ContentContext } from '../app/Content';
import { Form, Input } from 'antd';
import styled from 'react-emotion';
import ImagePalette from 'react-image-palette';
import { compose, lifecycle } from 'recompose';

const Style = styled('div')`
  padding-right: 12px;
`;

const enhance = compose<any, any>(
  lifecycle<any, any>({
    componentDidUpdate(prevProps) {
      if (prevProps.color !== this.props.palette.color) {
        this.props.handlePaletteChange(this.props.palette);
      }
    }
  })
);

const Foo = enhance(() => null);

export const Editor = () => (
  <Style>
    <ContentContext.Consumer>
      {
        ctx => (
          <Form>
            <Form.Item label="src">
              <Input
                value={ctx.imgSrc}
                onChange={ctx.handleImgSrcChange}
              />
            </Form.Item>
            <Form.Item label="colors">
              <ImagePalette
                image={ctx.imgSrc}
                crossOrigin={true}
                default={{ palette: { color: ctx.color, backgroundColor: ctx.backgroundColor, alternativeColor: ctx.alternativeColor } }}
              >
                {(palette: any) => <Foo palette={palette} {...ctx} />}
              </ImagePalette>
              <p>{ctx.color}</p>
              <p>{ctx.backgroundColor}</p>
              <p>{ctx.alternativeColor}</p>
            </Form.Item>
          </Form>
        )
      }
    </ContentContext.Consumer>
  </Style>
);
