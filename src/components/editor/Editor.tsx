import * as React from 'react';
import { Row, Icon, Col, Form, Input, Button, Divider, Upload, InputNumber } from 'antd';
import styled from 'react-emotion';
import { Preview } from '../preview';
import { compose, withState, withHandlers, withProps } from 'recompose';
import { IPalette } from 'types/palette';
import { DEFAULT_PALETTE } from 'constants/DEFAULT_PALETTE';
import { Audio } from '../audio';
import { UploadChangeParam } from 'antd/lib/upload';
import { ITextSpec } from 'types/text-spec';
import { DEFAULT_TEXT_SPECS } from 'constants/DEFAULT_TEXT_SPECS';
import { loop } from 'enhancers/loop';
import ButtonGroup from 'antd/lib/button/button-group';

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
  clearTextSpecs: () => void;
  handleTextSpecTextChange: (ndx: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextSpecDurationMsChange: (ndx: number) => (value: number | string) => void;
  handleSongNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleArtistNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  syncCurrentTimeMs: (currentTimeMs: number) => void;
  syncDurationMs: (durationMs: number) => void;
}

interface ICurrentTextSpecProps extends IWithHandlerProps {
  currentTextSpec: ITextSpec | null;
  currentTextSpecFrom: number | null;
  currentTextSpecTo: number | null;
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
      props.setTextSpecNdx(0);
    },
    addTextSpec: (props: IWithStateProps) => () => {
      const nextTextSpecs: ITextSpec[] = props.textSpecs.map(textSpec => ({ ...textSpec }));

      nextTextSpecs.push({ text: '', durationMs: 1000 });

      props.setTextSpecs(nextTextSpecs);
    },
    removeTextSpec: (props: IWithStateProps) => () => {
      const nextTextSpecs: ITextSpec[] = props.textSpecs.map(textSpec => ({ ...textSpec }));

      nextTextSpecs.pop();

      props.setTextSpecs(nextTextSpecs);
    },
    clearTextSpecs: (props: IWithStateProps) => () => {
      props.setTextSpecs([]);
    },
    handleTextSpecTextChange: (props: IWithStateProps) => (ndx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextTextSpecs = props.textSpecs.map(textSpec => ({ ...textSpec }));
      nextTextSpecs[ndx].text = event.currentTarget.value;

      props.setTextSpecs(nextTextSpecs);
    },
    handleTextSpecDurationMsChange: (props: IWithStateProps) => (ndx: number) => (value: string | number) => {
      const durationMs = typeof value === 'string' ? parseInt(value, 10) : value;

      if (isNaN(durationMs)) {
        return;
      }

      const nextTextSpecs = props.textSpecs.map(textSpec => ({ ...textSpec }));
      nextTextSpecs[ndx].durationMs = durationMs;

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
  withProps((props: IWithHandlerProps) => {
    const currentTextSpec = props.textSpecs[props.textSpecNdx] || null;
    let currentTextSpecFrom: number | null = null;
    let currentTextSpecTo: number | null = null;

    if (currentTextSpec) {
      const prevTextSpecs = props.textSpecs.slice(undefined, props.textSpecNdx);
      currentTextSpecFrom = prevTextSpecs.reduce((totalDurationMs, textSpec) => (
        totalDurationMs + textSpec.durationMs
      ), 0);
      currentTextSpecTo = currentTextSpecFrom + currentTextSpec.durationMs
    }

    return { currentTextSpec, currentTextSpecFrom, currentTextSpecTo }
  }),
  withProps((props: ICurrentTextSpecProps) => {
    let text1: string = '';
    let text2: string = '';

    const { currentTextSpec, songName, artistName } = props;

    if (!currentTextSpec) {
      text1 = songName;
      text2 = artistName;
    } else {
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

    if (typeof props.currentTextSpecTo !== 'number') {
      return;
    }

    if (props.currentTimeMs > props.currentTextSpecTo) {
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
        <Form layout="inline">
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
            <Button onClick={props.resetPalette}>
              <Icon type="reload" /> reset palette
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
        <h3>text</h3>
        <Form layout="inline">
          <Form.Item>
            <ButtonGroup>
              <Button onClick={props.addTextSpec}>
                <Icon type="plus" /> 1
            </Button>
              <Button onClick={props.removeTextSpec}>
                <Icon type="minus" /> 1
            </Button>
            </ButtonGroup>
          </Form.Item>
          {
            props.textSpecs.map(({ text, durationMs }, ndx) => (
              <Form.Item label={`text ${ndx + 1}`} key={`text-spec-${ndx}`}>
                <Input
                  value={text}
                  onChange={props.handleTextSpecTextChange(ndx)}
                />
                <InputNumber
                  min={0}
                  value={durationMs}
                  onChange={props.handleTextSpecDurationMsChange(ndx)}
                />
              </Form.Item>
            ))
          }
          <Form.Item>
            <Button type="danger" onClick={props.clearTextSpecs}>
              remove all
          </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
        <Preview
          src={props.imgSrc}
          palette={props.palette}
          onPaletteChange={props.handlePaletteChange}
          artistName={props.artistName}
          songName={props.songName}
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
