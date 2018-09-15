import * as React from 'react';
import { compose, lifecycle, shouldUpdate } from 'recompose';
import { IPalette } from 'types/palette';
import { isEqual } from 'lodash';

interface IOuterProps {
  palette: IPalette;
  onPaletteChange: (palette: IPalette) => void;
}

const enhance = compose<IOuterProps, IOuterProps>(
  shouldUpdate<IOuterProps>((props, nextProps) => !isEqual(props.palette, nextProps.palette)),
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
