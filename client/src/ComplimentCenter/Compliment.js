//React, make me something that'll not only show humans their compliments, but
//help them change those compliments if their not to their liking or get rid
//of them if theirs just no way to improve them.
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Button, ButtonGroup, ListGroupItem } from 'reactstrap';
import '../App.css';

const Compliment = props => (
  <ListGroupItem>
      <div>
        <ReactMarkdown source={props.children} />
      </div>

      <span>{moment(props.timestamp).fromNow()}</span>

      <ButtonGroup className="clearfix float-right">
      <Button className="btn button" onClick={() => { props.handleUpdateCompliment(props.id); }}>update</Button>
      <Button className="btn button" onClick={() => { props.handleDeleteCompliment(props.id); }}>delete</Button>
      </ButtonGroup>
  </ListGroupItem>
);

Compliment.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleUpdateCompliment: PropTypes.func.isRequired,
  handleDeleteCompliment: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Compliment;
