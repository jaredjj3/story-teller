import React from 'react';
import styled from 'styled-components';
import { compose, toClass, mapProps } from 'recompose';

const enhance = compose(
  toClass,
  mapProps(props => {
    const restProps = Object.assign({}, props);
    const title = restProps.title;
    const children = restProps.children;
    const innerId = restProps.innerId;
    const innerStyle = restProps.innerStyle;

    delete restProps.title;
    delete restProps.children;
    delete restProps.innerId;
    delete restProps.innerStyle;

    return {
      title,
      children,
      innerId,
      innerStyle,
      restProps
    };
  })
);

const PageOuter = styled.div`
  overflow: hidden;
  width: 360px;
`;
const PageInner = styled.div`
  margin: 0 auto;
  height: 640px;
`;

const Page = ({ children, title, innerId, innerStyle, restProps }) => (
  <PageOuter {...restProps}>
    <PageInner id={innerId} style={innerStyle}>
      {children}
    </PageInner>
  </PageOuter>
);

export default enhance(Page);