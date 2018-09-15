import * as React from 'react';
import { Row, Col, Form, Input, Button, Divider } from 'antd';
import styled from 'react-emotion';
import { Preview } from '../preview';
import { compose, withState, withHandlers } from 'recompose';
import { IPalette } from '../../types/palette';
import { DEFAULT_PALETTE } from 'constants/DEFAULT_PALETTE';

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
  handleColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackgroundColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAlternativeColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetPalette: (event: React.SyntheticEvent) => void;
}

const enhance = compose<IWithHandlerProps, {}>(
  withState('src', 'setSrc', 'https://i.scdn.co/image/c86f5f7a542e81c14ec6a65f009a2ab801e32272'),
  withState('color', 'setColor', DEFAULT_PALETTE.color),
  withState('backgroundColor', 'setBackgroundColor', DEFAULT_PALETTE.backgroundColor),
  withState('alternativeColor', 'setAlternativeColor', DEFAULT_PALETTE.alternativeColor),
  withState('timeMs', 'setTimeMs', 60000),
  withState('playing', 'setPlaying', false),
  withHandlers({
    handleSrcChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setSrc(event.currentTarget.value);
    },
    handlePaletteChange: (props: IWithStateProps) => (palette: IPalette) => {
      const { color, backgroundColor, alternativeColor } = palette;
      props.setColor(color);
      props.setBackgroundColor(backgroundColor);
      props.setAlternativeColor(alternativeColor);
    },
    handleColorChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setColor(event.currentTarget.value);
    },
    handleBackgroundColorChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setBackgroundColor(event.currentTarget.value);
    },
    handleAlternativeColorChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setAlternativeColor(event.currentTarget.value);
    },
    resetPalette: (props: IWithStateProps) => (event: React.SyntheticEvent) => {
      event.preventDefault();
      const { src } = props;
      props.setSrc('');
      window.setTimeout(() => props.setSrc(src), 0);
    }
  })
);

const Style = styled('div')`
  padding-right: 12px;
`;

interface IColorBoxProps {
  color: string;
}

const ColorBox = styled('div') <IColorBoxProps>`
  border: 1px solid black;
  background-color: ${props => props.color};
  height: 16px;
  margin-top: 4px;
`;

export const Editor = enhance(props => (
  <Style>
    <Row gutter={24}>
      <Col span={6}>
        <Form>
          <Form.Item label="src">
            <Input value={props.src} onChange={props.handleSrcChange} />
          </Form.Item>
          <Divider />
          <Form.Item label="color">
            <Input value={props.color} onChange={props.handleColorChange} />
            <ColorBox color={props.color} />
          </Form.Item>
          <Form.Item label="background color">
            <Input value={props.backgroundColor} onChange={props.handleBackgroundColorChange} />
            <ColorBox color={props.backgroundColor} />
          </Form.Item>
          <Form.Item label="alternative color">
            <Input value={props.alternativeColor} onChange={props.handleAlternativeColorChange} />
            <ColorBox color={props.alternativeColor} />
          </Form.Item>
          <Form.Item>
            <Button
              block={true}
              type="primary"
              onClick={props.resetPalette}
            >
              reset palette
            </Button>
          </Form.Item>
          <Divider />
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
