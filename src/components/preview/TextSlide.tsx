import * as React from 'react'
import styled from 'react-emotion';

interface IProps {
  text: string;
}

const Style = styled('div')`
  font-size: 4em;
  text-align: center;
`;

export const TextSlide: React.SFC<IProps> = props => <Style>{props.text}</Style>;
