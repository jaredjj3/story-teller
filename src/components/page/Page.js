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

    delete restProps.title;
    delete restProps.children;
    delete restProps.innerId;

    return {
      title,
      children,
      innerId,
      restProps
    };
  })
);

const PageOuter = styled.span`
  overflow: hidden;
  box-sizing: border-box;
`;
const PageInner = styled.div`
  margin: 0 auto;
  padding: 2px;
  border: 1px dashed #eee;
  width: 360px;
  height: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Page = ({ children, title, innerId, restProps }) => (
  <PageOuter {...restProps}>
    <h3>{title}</h3>
    <PageInner id={innerId}>
      {children}
    </PageInner>
  </PageOuter>
);

export default enhance(Page);