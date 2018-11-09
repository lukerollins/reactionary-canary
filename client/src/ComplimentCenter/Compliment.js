// Comment.js
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Compliment = props => (
  <div className="singleComment">
    <div className="textContent">
      <div className="singleCommentContent">
        <ReactMarkdown source={props.children} />
      </div>
      <div className="singleCommentButtons">
      <span className="time">{moment(props.timestamp).fromNow()}</span>
      <button onClick={() => { props.handleUpdateCompliment(props.id); }}>update</button>
      <button onClick={() => { props.handleDeleteCompliment(props.id); }}>delete</button>
      </div>
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
