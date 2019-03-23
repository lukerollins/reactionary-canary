// React, make me a tool that'll let us humans put our compliments into the database
//for display later. 
import React from 'react';
import PropTypes from 'prop-types';
import {  Button, Form, Input, FormGroup, Row, Col } from 'reactstrap';
import '../Redesigned_App.css';

const ComplimentForm = props => (
  <Form className="justify-content-center" onSubmit={props.submitCompliment}>
    <FormGroup>
    <Input
      className="expand"
      type="textarea"
      name="text"
      placeholder="Your compliment..."
      value={props.text}
      onChange={props.handleChangeText}/>
    <Row>
      <Col lg="1">
        <Button className="btn chirp button" type="submit">Chirp!</Button>
      </Col>
    </Row>
    </FormGroup>
  </Form>
);

ComplimentForm.propTypes = {
  submitCompliment: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  text: PropTypes.string
};

ComplimentForm.defaultProps = {
  text: ''
};

export default ComplimentForm;
