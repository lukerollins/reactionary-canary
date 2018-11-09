// ComplimentForm.js
import React from 'react';
import PropTypes from 'prop-types';

const ComplimentForm = props => (
  <form onSubmit={props.submitCompliment}>
    <input
      type="text"
      name="text"
      placeholder="Your compliment..."
      value={props.text}
      onChange={props.handleChangeText}
    />
    <button type="submit">Submit</button>
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
