import * as React from 'react';
import { Row, Icon, Col, Form, Input, Button, Divider, InputNumber, Upload } from 'antd';
import styled from 'react-emotion';
import { Preview } from '../preview';
import { compose, withState, withHandlers } from 'recompose';
import { IPalette } from 'types/palette';
import { DEFAULT_PALETTE } from 'constants/DEFAULT_PALETTE';
import { Audio } from '../audio';
import { UploadChangeParam } from 'antd/lib/upload';
import { ITextSpec } from 'types/text-spec';
import { last, get } from 'lodash';
import { DEFAULT_TEXT_SPECS } from 'constants/DEFAULT_TEXT_SPECS';

interface IWithStateProps {
  imgSrc: string;
  musicSrc: any;
  palette: IPalette;
  timeMs: number;
  playing: boolean;
  textSpecs: ITextSpec[];
  songName: string;
  artistName: string;
  setPalette: (palette: IPalette) => void;
  setImgSrc: (src: string) => void;
  setTimeMs: (timeMs: number) => void;
  setMusicSrc: (musicSrc: string) => void;
  setPlaying: (playing: boolean) => void;
  setTextSpecs: (textSpecs: ITextSpec[]) => void;
  setSongName: (songName: string) => void;
  setArtistName: (artistName: string) => void;
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
  addTextSpec: () => void;
  removeTextSpec: () => void;
  handleTextSpecTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextSpecFromChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextSpecToChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSongNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleArtistNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const enhance = compose<IWithHandlerProps, {}>(
  withState('imgSrc', 'setImgSrc', 'default_image.jpeg'),
  withState('musicSrc', 'setMusicSrc', 'default_audio.m4a'),
  withState('palette', 'setPalette', DEFAULT_PALETTE),
  withState('timeMs', 'setTimeMs', 60000),
  withState('playing', 'setPlaying', false),
  withState('textSpecs', 'setTextSpecs', DEFAULT_TEXT_SPECS),
  withState('songName', 'setSongName', 'night time blues'),
  withState('artistName', 'setArtistName', 'castelluzzo'),
  withHandlers({
    handleSrcChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setImgSrc(event.currentTarget.value);
    },
    handlePaletteChange: (props: IWithStateProps) => (palette: IPalette) => {
      props.setPalette({ ...palette });
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
    },
    addTextSpec: (props: IWithStateProps) => () => {
      const nextTextSpecs: ITextSpec[] = props.textSpecs.map(textSpec => ({ ...textSpec }));
      const from: number = get(last(nextTextSpecs), 'to', 1000);
      const to: number = from + 5000;

      nextTextSpecs.push({ text: '', from, to });

      props.setTextSpecs(nextTextSpecs);
    },
    removeTextSpec: (props: IWithStateProps) => () => {
      const nextTextSpecs: ITextSpec[] = props.textSpecs.map(textSpec => ({ ...textSpec }));

      nextTextSpecs.pop();

      props.setTextSpecs(nextTextSpecs);
    },
    handleTextSpecTextChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { currentTarget } = event;
      const ndx = currentTarget.getAttribute('data-ndx');

      if (!ndx) {
        return;
      }

      const nextTextSpecs = props.textSpecs.map(textSpec => ({ ...textSpec }));
      nextTextSpecs[ndx].text = currentTarget.value;

      props.setTextSpecs(nextTextSpecs);
    },
    handleTextSpecFromChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { currentTarget } = event;
      const ndx = currentTarget.getAttribute('data-ndx');

      if (!ndx) {
        return;
      }

      const from = parseInt(currentTarget.value, 10);

      if (isNaN(from)) {
        return;
      }

      const nextTextSpecs = props.textSpecs.map(textSpec => ({ ...textSpec }));
      nextTextSpecs[ndx].from = from;

      props.setTextSpecs(nextTextSpecs);
    },
    handleTextSpecToChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { currentTarget } = event;
      const ndx = currentTarget.getAttribute('data-ndx');

      if (!ndx) {
        return;
      }

      const to = parseInt(currentTarget.value, 10);

      if (isNaN(to)) {
        return;
      }

      const nextTextSpecs = props.textSpecs.map(textSpec => ({ ...textSpec }));
      nextTextSpecs[ndx].to = to;

      props.setTextSpecs(nextTextSpecs);
    },
    handleSongNameChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setSongName(event.currentTarget.value);
    },
    handleArtistNameChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setArtistName(event.currentTarget.value);
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
      <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
        <Form>
          <h3>main</h3>
          <Form.Item label="img src">
            <Input
              disabled={props.playing}
              value={props.imgSrc}
              onChange={props.handleSrcChange}
            />
          </Form.Item>
          <Form.Item label="song">
            <Input
              disabled={props.playing}
              value={props.songName}
              onChange={props.handleSongNameChange}
            />
          </Form.Item>
          <Form.Item label="artist">
            <Input
              disabled={props.playing}
              value={props.artistName}
              onChange={props.handleArtistNameChange}
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
          <h3>color</h3>
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
      <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
        <h3>text</h3>
        <Button
          disabled={props.playing}
          onClick={props.addTextSpec}
        >
          <Icon type="plus" /> text
          </Button>
        <Button
          disabled={props.playing}
          onClick={props.removeTextSpec}
        >
          <Icon type="minus" /> text
          </Button>
        {
          props.textSpecs.map(({ text, from, to }, ndx) => (
            <Form.Item label={`text ${ndx + 1}`} key={`text-spec-${ndx}`}>
              <Input
                data-ndx={ndx}
                disabled={props.playing}
                value={text}
                onChange={props.handleTextSpecTextChange}
              />
              <Input
                data-ndx={ndx}
                disabled={props.playing}
                value={from}
                onChange={props.handleTextSpecFromChange}
              />
              <Input
                data-ndx={ndx}
                disabled={props.playing}
                value={to}
                onChange={props.handleTextSpecToChange}
              />
            </Form.Item>
          ))
        }
      </Col>
      <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
        <Preview
          src={props.imgSrc}
          artistName={props.artistName}
          songName={props.songName}
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
