import * as React from 'react';
import { Row, Icon, Col, Form, Input, Button, Divider, InputNumber, Upload } from 'antd';
import styled from 'react-emotion';
import { Preview } from '../preview';
import { compose, withState, withHandlers, withProps } from 'recompose';
import { IPalette } from 'types/palette';
import { DEFAULT_PALETTE } from 'constants/DEFAULT_PALETTE';
import { Audio } from '../audio';
import { UploadChangeParam } from 'antd/lib/upload';
import { ITextSpec } from 'types/text-spec';
import { last, get } from 'lodash';
import { DEFAULT_TEXT_SPECS } from 'constants/DEFAULT_TEXT_SPECS';
import { loop } from 'enhancers/loop';

interface IWithStateProps {
  imgSrc: string;
  musicSrc: any;
  palette: IPalette;
  playing: boolean;
  textSpecs: ITextSpec[];
  songName: string;
  artistName: string;
  currentTimeMs: number;
  textSpecNdx: number;
  durationMs: number;
  setPalette: (palette: IPalette) => void;
  setImgSrc: (src: string) => void;
  setMusicSrc: (musicSrc: string) => void;
  setPlaying: (playing: boolean) => void;
  setTextSpecs: (textSpecs: ITextSpec[]) => void;
  setSongName: (songName: string) => void;
  setArtistName: (artistName: string) => void;
  setCurrentTimeMs: (currentTimeMs: number) => void;
  setTextSpecNdx: (textSpecNdx: number) => void;
  setDurationMs: (durationMs: number) => void;
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
  syncCurrentTimeMs: (currentTimeMs: number) => void;
  syncDurationMs: (durationMs: number) => void;
}

interface ICurrentTextSpecProps extends IWithHandlerProps {
  currentTextSpec: ITextSpec | null;
}

interface ITextProps extends ICurrentTextSpecProps {
  text1: string;
  text2: string;
}

interface IProgressProps extends ITextProps {
  progress: number;
}

const enhance = compose<IProgressProps, {}>(
  withState('imgSrc', 'setImgSrc', 'default_image.jpeg'),
  withState('musicSrc', 'setMusicSrc', 'default_audio.m4a'),
  withState('palette', 'setPalette', DEFAULT_PALETTE),
  withState('timeMs', 'setTimeMs', 60000),
  withState('playing', 'setPlaying', false),
  withState('textSpecs', 'setTextSpecs', DEFAULT_TEXT_SPECS),
  withState('songName', 'setSongName', 'night time blues'),
  withState('artistName', 'setArtistName', 'castelluzzo'),
  withState('currentTimeMs', 'setCurrentTimeMs', 0),
  withState('textSpecNdx', 'setTextSpecNdx', 0),
  withState('durationMs', 'setDurationMs', 0),
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
      props.setTextSpecNdx(0);
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
      const dataNdx = currentTarget.getAttribute('data-ndx');

      if (!dataNdx) {
        return;
      }

      const ndx = parseInt(dataNdx, 10);
      const to = parseInt(currentTarget.value, 10);

      if (isNaN(to)) {
        return;
      }

      // TODO: Preserve deltas between specs and within specs
      const nextTextSpecs = props.textSpecs.map(textSpec => ({ ...textSpec }));
      const currSpec = nextTextSpecs[ndx];

      currSpec.to = to;

      // adjust the specs so they don't overlap
      nextTextSpecs.forEach((spec, specNdx, self) => {
        const prevSpec = self[specNdx - 1];

        if (!prevSpec) {
          return;
        }

        if (spec.from < prevSpec.to) {
          const delta = spec.to - spec.from;
          spec.from = prevSpec.to;
          spec.to = spec.from + delta;
        }
      })

      props.setTextSpecs(nextTextSpecs);
    },
    handleSongNameChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setSongName(event.currentTarget.value);
    },
    handleArtistNameChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setArtistName(event.currentTarget.value);
    },
    syncCurrentTimeMs: (props: IWithStateProps) => (timeMs: number) => {
      props.setCurrentTimeMs(timeMs);
    },
    syncDurationMs: (props: IWithStateProps) => (durationMs: number) => {
      props.setDurationMs(durationMs);
    }
  }),
  withProps((props: IWithHandlerProps) => ({
    currentTextSpec: props.textSpecs[props.textSpecNdx] || null
  })),
  withProps((props: ICurrentTextSpecProps) => {
    let text1: string = '';
    let text2: string = '';

    const { currentTextSpec, currentTimeMs, songName, artistName } = props;

    if (!currentTextSpec) {
      text1 = songName;
      text2 = artistName;
    } else if (currentTextSpec.from < currentTimeMs && currentTextSpec.to > currentTimeMs) {
      text1 = currentTextSpec.text;
    }

    return { text1, text2 };
  }),
  withProps((props: ITextProps) => ({
    progress: props.currentTimeMs / props.durationMs
  })),
  loop<IProgressProps>(props => {
    if (!props.currentTextSpec) {
      return;
    }

    if (props.currentTimeMs > props.currentTextSpec.to) {
      props.setTextSpecNdx(props.textSpecNdx + 1);
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
              value={props.imgSrc}
              onChange={props.handleSrcChange}
            />
          </Form.Item>
          <Form.Item label="song">
            <Input
              value={props.songName}
              onChange={props.handleSongNameChange}
            />
          </Form.Item>
          <Form.Item label="artist">
            <Input
              value={props.artistName}
              onChange={props.handleArtistNameChange}
            />
          </Form.Item>
          <Form.Item>
            <Upload
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
              <Button>
                <Icon type="upload" /> upload music
              </Button>
            </Upload>
          </Form.Item>
          <Divider />
          <h3>color</h3>
          <Form.Item label="color">
            <Input
              value={props.palette.color}
              onChange={props.handleColorChange}
            />
            <ColorBox color={props.palette.color} />
          </Form.Item>
          <Form.Item label="background color">
            <Input
              value={props.palette.backgroundColor}
              onChange={props.handleBackgroundColorChange}
            />
            <ColorBox color={props.palette.backgroundColor} />
          </Form.Item>
          <Form.Item label="alternative color">
            <Input
              value={props.palette.alternativeColor}
              onChange={props.handleAlternativeColorChange}
            />
            <ColorBox color={props.palette.alternativeColor} />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={props.resetPalette}
            >
              <Icon type="reload" /> reset palette
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
        <h3>text</h3>
        <Button
          onClick={props.addTextSpec}
        >
          <Icon type="plus" /> text
          </Button>
        <Button
          onClick={props.removeTextSpec}
        >
          <Icon type="minus" /> text
          </Button>
        {
          props.textSpecs.map(({ text, from, to }, ndx) => (
            <Form.Item label={`text ${ndx + 1}`} key={`text-spec-${ndx}`}>
              <Input
                data-ndx={ndx}
                value={text}
                onChange={props.handleTextSpecTextChange}
              />
              <Input
                data-ndx={ndx}
                value={from}
                onChange={props.handleTextSpecFromChange}
              />
              <Input
                data-ndx={ndx}
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
          palette={props.palette}
          onPaletteChange={props.handlePaletteChange}
          text1={props.text1}
          text2={props.text2}
          progress={props.progress}
        />
        <Audio
          onCurrentTimeMsChange={props.syncCurrentTimeMs}
          onDurationMsChange={props.syncDurationMs}
          onPlay={props.handlePlay}
          onPause={props.handlePause}
          src={props.musicSrc}
        />
      </Col>
    </Row>
  </Style>
));
