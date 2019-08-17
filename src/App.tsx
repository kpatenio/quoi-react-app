import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// TODO - convert into a state component!

const App: React.FC = () => {
  // TODO - change to proper state
  const [testState, setTestState] = useState(null);
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/')
    .then((response) => {
      console.log(response);
      setTestState(response.data);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> {testState} </p>
        {/* //TODO - what are target and rel? */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
