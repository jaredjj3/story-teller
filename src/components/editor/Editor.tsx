import * as React from 'react';
import { Row, Col, Form, Input } from 'antd';
import styled from 'react-emotion';
import { Preview } from '../preview';
import { compose, withState, withHandlers } from 'recompose';
import { IPalette } from '../../types/palette';

interface IWithStateProps {
  src: string;
  color: string;
  backgroundColor: string;
  alternativeColor: string;
  setSrc: (src: string) => void;
  setColor: (color: string) => void;
  setBackgroundColor: (backgroundColor: string) => void;
  setAlternativeColor: (alternativeColor: string) => void;
}

interface IWithHandlerProps extends IWithStateProps {
  handleSrcChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaletteChange: (palette: IPalette) => void;
}

const enhance = compose<IWithHandlerProps, {}>(
  withState('src', 'setSrc', 'https://i.scdn.co/image/c86f5f7a542e81c14ec6a65f009a2ab801e32272'),
  withState('color', 'setColor', 'black'),
  withState('backgroundColor', 'setBackgroundColor', 'white'),
  withState('alternativeColor', 'setAlternativeColor', 'fuschia'),
  withHandlers({
    handleSrcChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setSrc(event.currentTarget.value);
    },
    handlePaletteChange: (props: IWithStateProps) => (palette: IPalette) => {
      const { color, backgroundColor, alternativeColor } = palette;
      props.setColor(color);
      props.setBackgroundColor(backgroundColor);
      props.setAlternativeColor(alternativeColor);
    }
  })
);

const Style = styled('div')`
  padding-right: 12px;
`;

export const Editor = enhance(props => (
  <Style>
    <Row gutter={24}>
      <Col span={6}>
        <Form>
          <Form.Item label="src">
            <Input value={props.src} onChange={props.handleSrcChange} />
          </Form.Item>
        </Form>
      </Col>
      <Col span={18}>
        <Preview
          src={props.src}
          onPaletteChange={props.handlePaletteChange}
        />
      </Col>
    </Row>
  </Style>
));
