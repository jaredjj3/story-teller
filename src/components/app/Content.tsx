import { Layout, Row, Col } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';
import { Editor, Preview } from 'components';
import { THEME } from 'constants/index';
import { compose, withState, withHandlers } from 'recompose';

interface IWithStateProps {
  imgSrc: string;
  color: string;
  backgroundColor: string;
  alternativeColor: string;
  setImgSrc: (imgSrc: string) => void;
  setColor: (color: string) => void;
  setBackgroundColor: (backgroundColor: string) => void;
  setAlternativeColor: (alternativeColor: string) => void;
}

interface IPalette {
  color: string;
  backgroundColor: string;
  alternativeColor: string;
}

interface IWithHandlerProps extends IWithStateProps {
  handleImgSrcChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaletteChange: (palette: IPalette) => void;
}

const enhance = compose<IWithHandlerProps, {}>(
  withState('imgSrc', 'setImgSrc', 'https://i.scdn.co/image/66e9cdf5889a43b97f9e6b5b0641b74b5a201759'),
  withState('color', 'setColor', 'black'),
  withState('backgroundColor', 'setBackgroundColor', 'white'),
  withState('alternativeColor', 'setAlternativeColor', 'darkgray'),
  withHandlers({
    handleImgSrcChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setImgSrc(event.target.value);
    },
    handlePaletteChange: (props: IWithStateProps) => (palette: IPalette) => {
      props.setColor(palette.color);
      props.setBackgroundColor(palette.backgroundColor);
      props.setAlternativeColor(palette.alternativeColor);
    }
  })
);

export const ContentContext = React.createContext({
  imgSrc: 'https://i.scdn.co/image/66e9cdf5889a43b97f9e6b5b0641b74b5a201759',
  color: 'black',
  backgroundColor: 'white',
  alternativeColor: 'darkgray',
  handleImgSrcChange: (event: React.ChangeEvent<HTMLInputElement>) => { return; },
  setImgSrc: (imgSrc: string) => { return; },
  setBackgroundColor: (backgroundColor: string) => { return; },
  setAlternativeColor: (alternativeColor: string) => { return; },
  handlePaletteChange: (palette: IPalette) => { return; }
});

const Style = styled('div')`
  min-height: 100vh;
  max-width: ${() => THEME.maxWidth};
  margin: 0 auto;
  padding-top: 50px;
`;

export const Content = enhance(props => (
  <Layout.Content style={{ padding: '0 50px' }}>
    <Style>
      <ContentContext.Provider value={props}>
        <Row>
          <Col span={6}>
            <Editor />
          </Col>
          <Col span={18}>
            <Preview />
          </Col>
        </Row>
      </ContentContext.Provider>
    </Style>
  </Layout.Content>
));
