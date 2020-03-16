import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, FormGroup } from 'reactstrap';
import '../Redesigned_App.css';

const ComplimentEdit = props => ( 
    
    <Form className="thing">
    <FormGroup>
    <Input
      type="textarea"
      name="text"
      placeholder="Your compliment..."
      value={props.text}
      onChange={props.handleUpdateCompliment}/>
    </FormGroup>
    

    <div>
        <button className="btn und" onClick={() => { props.handleUpdateCompliment(props.id); }}>Update</button>
        <button className="btn und" onClick={() => { props.handleToggleEdit(props.id); }}>Cancel</button>
    </div>
    </Form>
);


ComplimentEdit.propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleUpdateCompliment: PropTypes.func.isRequired,
    handleToggleEdit: PropTypes.func.isRequired,
  };
  
  export default ComplimentEdit;