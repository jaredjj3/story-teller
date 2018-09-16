import * as React from 'react';
import { Row, Icon, Col, Form, Input, Button, Upload, Tabs, Slider } from 'antd';
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
import { ChromePicker, ColorResult } from 'react-color';

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
  handleColorChange: (color: ColorResult) => void;
  handleBackgroundColorChange: (color: ColorResult) => void;
  handleAlternativeColorChange: (color: ColorResult) => void;
  resetPalette: (event: React.SyntheticEvent) => void;
  handleMusicSrcChange: (info: UploadChangeParam) => void
  handlePlay: () => void;
  handlePause: () => void;
  addTextSpec: () => void;
  removeTextSpec: () => void;
  clearTextSpecs: () => void;
  handleTextSpecTextChange: (ndx: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextSpecDurationMsChange: (ndx: number) => (value: number) => void;
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

const MARKS_MAX = 5000;

const MARKS_STEP = 1000;

const SLIDER_MARKS = (() => {
  const numMarks = MARKS_MAX / MARKS_STEP;
  const marks = new Array(numMarks + 1).fill(null);
  return marks.reduce((sliderMarks, mark, ndx) => {
    sliderMarks[ndx * MARKS_STEP] = `${ndx}`;
    return sliderMarks;
  }, {})
})();

const colorToString = (color: ColorResult): string => {
  const { r, g, b, a } = color.rgb;
  return a ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgba(${r}, ${g}, ${b})`;
};

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
    handleColorChange: (props: IWithStateProps) => (color: ColorResult) => {
      props.setPalette({ ...props.palette, color: colorToString(color) });
    },
    handleBackgroundColorChange: (props: IWithStateProps) => (color: ColorResult) => {
      props.setPalette({ ...props.palette, backgroundColor: colorToString(color) });
    },
    handleAlternativeColorChange: (props: IWithStateProps) => (color: ColorResult) => {
      props.setPalette({ ...props.palette, alternativeColor: colorToString(color) });
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

      nextTextSpecs.push({ text: '', durationMs: 3000 });

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
    handleTextSpecDurationMsChange: (props: IWithStateProps) => (ndx: number) => (value: number) => {
      const nextTextSpecs = props.textSpecs.map(textSpec => ({ ...textSpec }));
      nextTextSpecs[ndx].durationMs = value;

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

const SliderMargin = styled('div')`
  margin: 0px 8px;
`;

export const Editor = enhance(props => (
  <Style>
    <Row gutter={24}>
      <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="main" key="1">
            <Form>
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
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="color" key="2">
            <Form>
              <Form.Item label="color">
                <ChromePicker
                  onChange={props.handleColorChange}
                  color={props.palette.color}
                />
              </Form.Item>
              <Form.Item label="background color">
                <ChromePicker
                  onChange={props.handleBackgroundColorChange}
                  color={props.palette.backgroundColor}
                />
              </Form.Item>
              <Form.Item label="alternative color">
                <ChromePicker
                  onChange={props.handleAlternativeColorChange}
                  color={props.palette.alternativeColor}
                />
              </Form.Item>
              <Form.Item>
                <Button onClick={props.resetPalette}>
                  <Icon type="reload" /> reset palette
            </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="text" key="3">
            <Form>
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
                    <SliderMargin>
                      <Slider
                        min={0}
                        max={MARKS_MAX}
                        marks={SLIDER_MARKS}
                        value={durationMs}
                        onChange={props.handleTextSpecDurationMsChange(ndx)}
                      />
                    </SliderMargin>
                  </Form.Item>
                ))
              }
              <Form.Item>
                <Button type="danger" onClick={props.clearTextSpecs}>
                  remove all
          </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Col>
      <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
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
          playing={props.playing}
          onCurrentTimeMsChange={props.syncCurrentTimeMs}
          onDurationMsChange={props.syncDurationMs}
          onPlay={props.handlePlay}
          onPause={props.handlePause}
          src={props.musicSrc}
        />
      </Col>
    </Row>
  </Style >
));
