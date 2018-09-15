import * as React from 'react';
import { compose, branch, renderNothing, withState, lifecycle, withHandlers } from 'recompose';
import { IPalette } from 'types/palette';
import ImagePalette from 'react-image-palette';
import { SyncPalette } from './SyncPalette';
import { DEFAULT_PALETTE } from 'constants/DEFAULT_PALETTE';
import styled from 'react-emotion';

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
    componentDidUpdate(prevProps) {
      // Validate the imgSrc
      if (this.props.src !== prevProps.src) {
        this.props.setIsSrcValid(false);
        this.props.testImgSrc();
      }
    }
  }),
  branch<IWithHandlerProps>(props => !props.isSrcValid, renderNothing)
);

const Style = styled('div')`
  display: flex;
  justify-content: center;
`;

export const Preview = enhance(props => (
  <Style>
    <img src={props.src} />
    <ImagePalette
      crossOrigin={true}
      image={props.src}
      defaults={DEFAULT_PALETTE}
    >
      {(palette: IPalette) => <SyncPalette onPaletteChange={props.onPaletteChange} palette={palette} />}
    </ImagePalette>
  </Style>
));
