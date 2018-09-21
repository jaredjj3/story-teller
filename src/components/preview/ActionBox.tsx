import * as React from 'react';
import styled from 'react-emotion';
import { IPalette } from '../../types/palette';
import { ActionBoxContent } from './ActionBoxContent';

interface IProps {
  src: string;
  progress: number;
  palette: IPalette;
  artistName: string;
  songName: string;
  text1: string;
  text2: string;
}

const Style = styled('div') <{ palette: IPalette }>`
  width: 640px;
  height: 640px;
  min-width: 640px;
  min-height: 640px;
  border: 4px solid red;
  color: ${props => props.palette.color};
  background-color: ${props => props.palette.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Centered = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 66%;
  margin: 0 auto;
`;

export const ActionBox: React.SFC<IProps> = props => (
  <Style palette={props.palette}>
    <Centered>
      <ActionBoxContent {...props} />
    </Centered>
  </Style>
);
