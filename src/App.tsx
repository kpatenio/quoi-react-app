import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import DOMPurify from 'dompurify';
// import parse from 'html-react-parser'; // if using this, reinstall package
import temp from './mockedAssets/en-fr/temp';

// TODO - use TypeScript interfaces!
// TODO - use SCSS and given classnames to change styling

// TODO - styling remove .cit with #{word_id} and children "&nbsp"?

const App: React.FC = () => {
  const content = temp.entryContent // temporary content!
  // TODO - change to proper state
  const [testState, setTestState] = useState('');
  useEffect(() => {
    // axios.get('http://127.0.0.1:5000/board')
    // .then((response) => {
    //   console.log(response);
    //   setTestState(response.data.entryContent); // TODO - new branch
    //   // TODO - errorCode and errorMessage
    // });
    setTestState(content);
  });
  const sanitizer = DOMPurify.sanitize; // TODO - use more of this
// TODO searchbar - https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div dangerouslySetInnerHTML={{__html: sanitizer(testState)}}/>
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
