// React, make me a tool that'll let us humans put our compliments into the database
//for display later. 
import React from 'react';
import PropTypes from 'prop-types';
import '../Redesigned_App.css';

const ComplimentForm = props => (
  <form className="form-group" onSubmit={props.submitCompliment}>
    <textarea
      className="expand"
      type="input"
      name="text"
      placeholder="Your compliment..."
      value={props.text}
      onChange={props.handleChangeText}/>
    
    <button className="btn chirp" type="submit">Chirp!</button>
  </form>
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
