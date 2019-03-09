// React, this is how you'll show us humans those compliments.
//You're going to need some stuff from Compliment.js to do this.
import React from 'react';
import PropTypes from 'prop-types';
import Compliment from './Compliment';
import '../Redesigned_App.css';

const ComplimentList = (props) => {
  const complimentNodes = props.data.map(compliment => (
    <Compliment 
        children={compliment.string}  
        key={compliment._id} 
        id={compliment._id}
        timestamp={compliment.updatedAt}
        handleUpdateCompliment={props.handleUpdateCompliment}
        handleDeleteCompliment={props.handleDeleteCompliment} 
    >
        { compliment.text }
    </Compliment>
  ));
  return (
    <div>
      { complimentNodes }
    </div>
  );
};

ComplimentList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
  handleDeleteCompliment: PropTypes.func.isRequired,
  handleUpdateCompliment: PropTypes.func.isRequired,
};

ComplimentList.defaultProps = {
  data: [],
};

export default ComplimentList;
