import { Layout, Row, Col } from 'antd';
import * as React from 'react';
import styled from 'react-emotion';
import { Editor, Preview } from 'components';
import { THEME } from 'constants/index';
import { compose, withState, withHandlers } from 'recompose';

interface IWithStateProps {
  imgSrc: string;
  setImgSrc: (imgSrc: string) => void;
}

interface IWithHandlerProps extends IWithStateProps {
  handleImgSrcChange: (event: React.ChangeEvent) => void;
}

const enhance = compose<IWithHandlerProps, {}>(
  withState('imgSrc', 'setImgSrc', ''),
  withHandlers({
    handleImgSrcChange: (props: IWithStateProps) => (event: any) => {
      props.setImgSrc(event.target.value);
    }
  })
);

export const ContentContext = React.createContext({
  imgSrc: '',
  handleImgSrcChange: (event: React.ChangeEvent) => { return; },
  setImgSrc: (imgSrc: string) => { return; }
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
