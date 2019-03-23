//Okay React, here's how I want you to make this application. You already know
//that you should only give the human those tools I told you to make when they need them,
//if they need them at all. Don't worry, I've shown you where to get them, as well as everything
//you need to build this application.
import React, { Component } from 'react';
import 'whatwg-fetch';
import ComplimentList from './ComplimentCenter/ComplimentList';
import ComplimentForm from './ComplimentCenter/ComplimentForm';
import { Container, ListGroup } from 'reactstrap';
import './Redesigned_App.css';
import Canary_Painted_Web from './Canary_Painted_Web.png'



class App extends Component {
 constructor() {
   super();
   this.state = {
     data: [  ], 
     error: null,
     text: '',
     updateId: null
  };  
  this.pollInterval= null;
}



componentDidMount() {
this.loadCompliments();
if (!this.pollInterval) {
  this.pollInterval = setInterval(this.loadCompliments, 2000);
  }
}


componentWillUnmount() {
  if (this.pollInterval) clearInterval(this.pollInterval);
  this.pollInterval = null;
}

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onUpdateCompliment = (id) => {
    const oldCompliment = this.state.data.find(c => c._id === id);
    if (!oldCompliment) return;
    this.setState({ 
      text: oldCompliment.text, 
      updateId: id 
    });
  }  


onDeleteCompliment = (id) => {
  const i = this.state.data.findIndex(c => c._id === id);
  const data = [
    ...this.state.data.slice(0, i),
    ...this.state.data.slice(i + 1),
  ];
  this.setState({ data });
  fetch(`api/compliments/${id}`, { method: 'DELETE' })
    .then(res => res.text()).then((res) => {
      if (!res.success) this.setState({ error: res.error });
    });
}

  submitCompliment = (e) => {
    e.preventDefault();
    const { text, updateId } = this.state;
    if (!text)
      return;
    if (updateId) {
      this.submitUpdatedCompliment();
    }
    else {
      this.submitNewCompliment();
    }
  };
  get submitCompliment() {
    return this._submitCompliment;
  }
  set submitCompliment(value) {
    this._submitCompliment = value;
  }
  
submitNewCompliment = () => {
  const { text } = this.state;
  const data = [
    ...this.state.data,
    {
      text,
      _id: Date.now().toString(),
      updatedAt: new Date(),
      createdAt: new Date()
    },
  ];
  this.setState({ data });
  fetch('/api/compliments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  }).then(res => res.json()).then((res) => {
    if (!res.success) this.setState({ error: res || res.error });
    else this.setState({ text: '', error: null });
  });
}

  submitUpdatedCompliment = () => {
    const { text, updateId  } = this.state;
    fetch(`/api/compliments/${updateId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ text: '', updateId: null });
    });
  }

loadCompliments = () => {
  fetch('/api/compliments/')
  .then(res => res.json())
  .then((res) => {
    console.log(res)
    if (!res.success) {
      this.setState({ error: res.error });
    } else { 
      this.setState({ data: res.data });
    }
  });
}
    

  render() {

    return (
      <Container>
        <h2>Canary Compliments</h2>
        <div className="canary">
        <img alt={"This canary wants to chirp about your most interesting compliments."}  src={Canary_Painted_Web} />
        </div>
        <ListGroup>
          <ComplimentList 
          data={this.state.data}
          handleDeleteCompliment={this.onDeleteCompliment}
          handleUpdateCompliment={this.onUpdateCompliment} />
        </ListGroup>
        
          
          <ComplimentForm  
          text={this.state.text}
          handleChangeText={this.onChangeText}
          submitCompliment={this.submitCompliment} />
      
        {this.state.error && <p>{this.state.error}</p>}
      </Container>
    );
  }
} 
export default App;
  
