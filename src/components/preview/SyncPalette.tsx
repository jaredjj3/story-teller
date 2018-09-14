import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { IPalette } from 'types/palette';

interface IOuterProps {
  palette: IPalette;
  onPaletteChange: (palette: IPalette) => void;
}

const enhance = compose<IOuterProps, IOuterProps>(
  lifecycle<IOuterProps, {}>({
    componentDidMount() {
      this.props.onPaletteChange(this.props.palette);
    },
    componentDidUpdate() {
      this.props.onPaletteChange(this.props.palette);
    }
  })
);

export const SyncPalette = enhance(() => null);
