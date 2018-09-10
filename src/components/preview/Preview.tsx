import * as React from 'react';
import styled from 'react-emotion';
import { compose, branch, renderNothing, withState, lifecycle, withHandlers } from 'recompose';

interface IOuterProps {
  src: string;
}

interface IWithStateProps extends IOuterProps {
  isSrcValid: boolean;
  setIsSrcValid: (isSrcValid: boolean) => void;
}

interface IWithHandlerProps extends IWithStateProps {
  testImgSrc: () => void;
}

const enhance = compose<IWithHandlerProps, IOuterProps>(
  withState('isSrcValid', 'setIsSrcValid', false),
  withHandlers({
    testImgSrc: (props: IWithStateProps) => () => {
      const img = document.createElement('img');
      img.onerror = () => props.setIsSrcValid(false);
      img.onload = () => props.setIsSrcValid(true);
      img.src = props.src;
    }
  }),
  lifecycle<IWithHandlerProps, {}>({
    componentDidMount() {
      this.props.testImgSrc();
    },
    componentDidUpdate() {
      this.props.testImgSrc();
    }
  }),
  branch<IWithStateProps>(props => !props.isSrcValid, renderNothing)
);

const Style = styled('div')`
  padding-left: 12px;
`;

export const Preview = enhance(props => (
  <Style>
    <img src={props.src} />
  </Style>
));
