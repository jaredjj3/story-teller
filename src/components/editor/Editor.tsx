import * as React from 'react';
import { ContentContext } from '../app/Content';
import { Form, Input } from 'antd';
import styled from 'react-emotion';

const Style = styled('div')`
  padding-right: 12px;
`;

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
          </Form>
        )
      }
    </ContentContext.Consumer>
  </Style>
);
