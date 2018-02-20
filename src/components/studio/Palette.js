import React from 'react';
import { compose, lifecycle } from 'recompose';
import { Row, Col, Button } from 'reactstrap';
import styled from 'styled-components';

const enhance = compose(
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { backgroundColor, color, alternativeColor } = nextProps;
      const { palette } = this.props;

      const changed = (
        backgroundColor !== palette.backgroundColor ||
        color !== palette.color ||
        alternativeColor !== palette.alternativeColor
      );

      if (changed) {
        nextProps.setPalette({
          backgroundColor,
          color,
          alternativeColor
        });
      }
    }
  })
);

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
const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const Palette = (props) => (
  <div>
    <Row>
      <Col xs={4} sm={4} md={4} lg={4} xl={4}>
        <Content>
          <div style={{ background: props.backgroundColor }} />
          <span><small>{props.backgroundColor}</small></span>
        </Content>
      </Col>
      <Col xs={4} sm={4} md={4} lg={4} xl={4}>
        <Content>
          <div style={{ background: props.color }} />
          <span><small>{props.color}</small></span>
        </Content>
      </Col>
      <Col xs={4} sm={4} md={4} lg={4} xl={4}>
        <Content>
          <div style={{ background: props.alternativeColor }} />
          <span><small>{props.alternativeColor}</small></span>
        </Content>
      </Col>
    </Row>
    <ButtonContainer>
      <Button
        outline
        block
        color="secondary"
        onClick={props.handlePaletteClick}
      >
        apply  
      </Button>
    </ButtonContainer>
  </div>
);

export default enhance(Palette);
