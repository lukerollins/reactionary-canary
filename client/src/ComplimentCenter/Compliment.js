//React, make me something that'll not only show humans their compliments, but
//help them change those compliments if their not to their liking or get rid
//of them if theirs just no way to improve them.
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import '../Redesigned_App.css';

const Compliment = props => (
  <div className="compliment-item">
  <div className="thing">
    <div className="texted">
      <div>
        <ReactMarkdown source={props.children} />
      </div>

      <span className="time">{moment(props.timestamp).fromNow()}</span>
    </div>
  </div>
      <div className="group">
        <button className="btn und" onClick={() => { props.handleUpdateCompliment(props.id); }}>Edit</button>
        <button className="btn und" onClick={() => { props.handleDeleteCompliment(props.id); }}>Delete</button>
      </div>
  </div>
);

Compliment.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleUpdateCompliment: PropTypes.func.isRequired,
  handleDeleteCompliment: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Compliment;
