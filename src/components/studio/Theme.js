import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

const Theme = props => (
  <div>
    <Label>
      <b>theme</b>
    </Label>
    <Row>
      <Col xs={6} md={6} lg={6}>
        <FormGroup>
          <Label for="story-type">story type</Label>
          <Input
            id="story-type"
            type="select"
            value={props.storyType}
            onChange={props.handleChange('setStoryType')}
          >
            <option value="personal">personal</option>
            <option value="string-sync">stringsync</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="color">color</Label>
          <Input
            id="color"
            type="text"
            value={props.color}
            onChange={props.handleChange('setColor')}
          />
        </FormGroup>
      </Col>
      <Col xs={6} md={6} lg={6}>
        <FormGroup>
          <Label for="background">background</Label>
          <Input
            id="background"
            type="text"
            value={props.background}
            onChange={props.handleChange('setBackground')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="text-align">align</Label>
          <Input
            id="text-align"
            type="select"
            value={props.textAlign}
            onChange={props.handleChange('setTextAlign')}
          >
            <option value="left">left</option>
            <option value="center">center</option>
            <option value="right">right</option>
          </Input>
        </FormGroup>
      </Col>
    </Row>
  </div>
);

export default Theme;
