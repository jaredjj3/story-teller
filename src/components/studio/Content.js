import React from 'react';
import { Row, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon  } from 'reactstrap';

const Content = props => (
  <div>
    <Label>
      <b>content</b>
    </Label>
    <Row>
      <Col xs={6} md={6} lg={6}>
        <FormGroup>
          <Label for="text1">text1</Label>
          <Input
            id="text1"
            type="text1"
            value={props.text1}
            onChange={props.handleChange('setText1')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="text2">text2</Label>
          <Input
            id="text2"
            type="text2"
            value={props.text2}
            onChange={props.handleChange('setText2')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="img">img</Label>
          <Input
            id="img"
            type="text"
            value={props.imgSrc}
            onChange={props.handleChange('setImgSrc')}
          />
        </FormGroup>
      </Col>
      <Col xs={6} md={6} lg={6}>
        <FormGroup>
          <Label for="text-size1">size1</Label>
          <Input
            id="text-size1"
            type="select"
            value={props.textSize1}
            onChange={props.handleChange('setTextSize1')}
          >
            <option value="1">xl</option>
            <option value="2">lg</option>
            <option value="3">md</option>
            <option value="4">sm</option>
            <option value="5">xs</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="text-size2">size2</Label>
          <Input
            id="text-size2"
            type="select"
            value={props.textSize2}
            onChange={props.handleChange('setTextSize2')}
          >
            <option value="1">xl</option>
            <option value="2">lg</option>
            <option value="3">md</option>
            <option value="4">sm</option>
            <option value="5">xs</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="time">time</Label>
          <InputGroup>
            <Input
              id="time"
              type="number"
              value={props.timeMs}
              onChange={props.handleChange('setTimeMs')}
            />
            <InputGroupAddon addonType="append">ms</InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Col>
    </Row>
  </div>
);

export default Content;
