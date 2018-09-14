import * as React from 'react';
import { compose, branch, renderNothing, withState, lifecycle, withHandlers } from 'recompose';
import { IPalette } from 'types/palette';
import ImagePalette from 'react-image-palette';
import { SyncPalette } from './SyncPalette';

interface IOuterProps {
  src: string;
  onPaletteChange: (palette: IPalette) => void;
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

export const Preview = enhance(props => (
  <div>
    <img src={props.src} />
    <ImagePalette crossOrigin={true} image={props.src}>
      {
        (palette: IPalette) => (
          <SyncPalette onPaletteChange={props.onPaletteChange} palette={palette} />
        )
      }
    </ImagePalette>
  </div>
));
