import * as React from 'react';
import { Row, Col, Form, Input } from 'antd';
import styled from 'react-emotion';
import { Preview } from '../preview';
import { compose, withState, withHandlers } from 'recompose';

interface IWithStateProps {
  src: string;
  setSrc: (src: string) => void;
}

interface IWithHandlerProps extends IWithStateProps {
  handleSrcChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const enhance = compose<IWithHandlerProps, {}>(
  withState('src', 'setSrc', 'https://i.scdn.co/image/c86f5f7a542e81c14ec6a65f009a2ab801e32272'),
  withHandlers({
    handleSrcChange: (props: IWithStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setSrc(event.currentTarget.value);
    }
  })
);

const Style = styled('div')`
  padding-right: 12px;
`;

export const Editor = enhance(props => (
  <Style>
    <Row>
      <Col span={6}>
        <Form>
          <Form.Item label="src">
            <Input value={props.src} onChange={props.handleSrcChange} />
          </Form.Item>
        </Form>
      </Col>
      <Col span={18}>
        <Preview src={props.src} />
      </Col>
    </Row>
  </Style>
));
