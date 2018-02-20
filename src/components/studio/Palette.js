import React from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  div {
    height: 50px;
    width: 50px;
    border: 1px solid black;
  }

  span {
    margin-top: 7px;
  }
`;

const Palette = ({ backgroundColor, color, alternativeColor}) => (
  <Row>
    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
      <Content>
        <div style={{ background: backgroundColor }} />
        <span><small>{backgroundColor}</small></span>
      </Content>
    </Col>
    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
      <Content>
        <div style={{ background: color }} />
        <span><small>{color}</small></span>
      </Content>
    </Col>
    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
      <Content>
        <div style={{ background: alternativeColor }} />
        <span><small>{alternativeColor}</small></span>
      </Content>
    </Col>
  </Row>
);

export default Palette;
