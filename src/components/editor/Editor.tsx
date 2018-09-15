import * as React from 'react';
import { Row, Icon, Col, Form, Input, Button, Divider, InputNumber, Upload } from 'antd';
import styled from 'react-emotion';
import { Preview } from '../preview';
import { compose, withState, withHandlers } from 'recompose';
import { IPalette } from 'types/palette';
import { DEFAULT_PALETTE } from 'constants/DEFAULT_PALETTE';
import { Audio } from '../audio';
import { UploadChangeParam } from 'antd/lib/upload';

interface ITextReelSpec {
  text: string;
  from: number;
  to: number;
}

interface IWithStateProps {
  imgSrc: string;
  musicSrc: any;
  palette: IPalette;
  timeMs: number;
  playing: boolean;
  setPalette: (palette: IPalette) => void;
  setImgSrc: (src: string) => void;
  setTimeMs: (timeMs: number) => void;
  setMusicSrc: (musicSrc: string) => void;
  setPlaying: (playing: boolean) => void;
}

interface IWithHandlerProps extends IWithStateProps {
  handleSrcChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaletteChange: (palette: IPalette) => void;
  handleColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackgroundColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAlternativeColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetPalette: (event: React.SyntheticEvent) => void;
  handleTimeMsChange: (timeMs: string | number) => void;
  handleMusicSrcChange: (info: UploadChangeParam) => void
  handlePlay: () => void;
  handlePause: () => void;
}

const enhance = compose<IWithHandlerProps, {}>(
  withState('imgSrc', 'setImgSrc', 'default_image.jpeg'),
  withState('musicSrc', 'setMusicSrc', 'default_audio.m4a'),
  withState('palette', 'setPalette', DEFAULT_PALETTE),
  withState('timeMs', 'setTimeMs', 60000),
  withState('playing', 'setPlaying', false),
  withState('textReel', 'setTextReel', []),
  withHandlers({
    handleSrcChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setImgSrc(event.currentTarget.value);
    },
    handlePaletteChange: (props: IWithStateProps) => (palette: IPalette) => {
      props.setPalette({...palette});
    },
    handleColorChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setPalette({ ...props.palette, color: event.currentTarget.value });
    },
    handleBackgroundColorChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setPalette({ ...props.palette, backgroundColor: event.currentTarget.value });
    },
    handleAlternativeColorChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setPalette({ ...props.palette, alternativeColor: event.currentTarget.value });
    },
    resetPalette: (props: IWithStateProps) => (event: React.SyntheticEvent) => {
      event.preventDefault();
      const { imgSrc } = props;
      props.setImgSrc('');
      window.setTimeout(() => props.setImgSrc(imgSrc), 0);
    },
    handleTimeMsChange: (props: IWithStateProps) => (timeMs: string | number) => {
      const nextTimeMs = typeof timeMs === 'string' ? parseInt(timeMs, 10) : timeMs;
      
      if (!isNaN(nextTimeMs)) {
        props.setTimeMs(nextTimeMs);
      }
    },
    handleMusicSrcChange: (props: IWithStateProps) => (info: UploadChangeParam) => {
      try {
        const musicSrc = URL.createObjectURL(info.file.originFileObj);
        props.setMusicSrc(musicSrc);
      } catch (error) {
        props.setMusicSrc('');
      }
    },
    handlePlay: (props: IWithStateProps) => () => {
      props.setPlaying(true);
    },
    handlePause: (props: IWithStateProps) => () => {
      props.setPlaying(false);
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
      <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
        <Form>
          <Form.Item label="img src">
            <Input
              disabled={props.playing}
              value={props.imgSrc}
              onChange={props.handleSrcChange}
            />
          </Form.Item>
          <Form.Item label="time ms">
            <InputNumber
              disabled={props.playing}
              min={1}
              step={1}
              value={props.timeMs}
              onChange={props.handleTimeMsChange} />
          </Form.Item>
          <Form.Item>
            <Upload
              disabled={props.playing}
              accept="audio/*"
              multiple={false}
              defaultFileList={[
                {
                  uid: '-1',
                  name: props.musicSrc,
                  status: 'done',
                  url: props.musicSrc,
                  size: 0,
                  type: 'file'
                }
              ]}
              onChange={props.handleMusicSrcChange}
            >
              <Button disabled={props.playing}>
                <Icon type="upload" /> upload music
              </Button>
            </Upload>
          </Form.Item>
          <Divider />
          <Form.Item label="color">
            <Input
              disabled={props.playing}
              value={props.palette.color}
              onChange={props.handleColorChange}
            />
            <ColorBox color={props.palette.color} />
          </Form.Item>
          <Form.Item label="background color">
            <Input
              disabled={props.playing}
              value={props.palette.backgroundColor}
              onChange={props.handleBackgroundColorChange}
            />
            <ColorBox color={props.palette.backgroundColor} />
          </Form.Item>
          <Form.Item label="alternative color">
            <Input
              disabled={props.playing}
              value={props.palette.alternativeColor}
              onChange={props.handleAlternativeColorChange}
            />
            <ColorBox color={props.palette.alternativeColor} />
          </Form.Item>
          <Form.Item>
            <Button disabled={props.playing} onClick={props.resetPalette}>
              <Icon type="reload" /> reset palette
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
        <Preview
          src={props.imgSrc}
          palette={props.palette}
          onPaletteChange={props.handlePaletteChange}
        />
        <Audio
          onPlay={props.handlePlay}
          onPause={props.handlePause}
          src={props.musicSrc}
        />
      </Col>
    </Row>
  </Style>
));
