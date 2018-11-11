// React, make me a tool that'll let us humans put our compliments into the database
//for display later. 
import React from 'react';
import PropTypes from 'prop-types';
import {  Button, Form, Input, FormGroup } from 'reactstrap';
import '../App.css';

const ComplimentForm = props => (
  <Form className="justify-content-center" onSubmit={props.submitCompliment}>
    <FormGroup>
    <Input
      type="textarea"
      name="text"
      placeholder="Your compliment..."
      value={props.text}
      onChange={props.handleChangeText}/>
    
    <Button className="btn chirp button" type="submit">Submit</Button>
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
