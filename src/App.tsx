import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import DOMPurify from 'dompurify';
// import parse from 'html-react-parser'; // if using this, reinstall package
import entry from './mockedAssets/en-fr/entry';

// TODO - use TypeScript interfaces!
// TODO - use SCSS and given classnames to change styling

// TODO - styling remove .cit with #{word_id} and children "&nbsp"?

const App: React.FC = () => {
  const content = entry.entryContent // temporary content!
  // TODO - change to proper state
  const [testState, setTestState] = useState('This is the index page!');
  const [dictLanguage, setDictLanguage] = useState('english-french');
  useEffect(() => {
  //     axios.get('https:127.0.0.1:5000/', {
  //       headers: { // headers to be read by flask app only
  //         dictToggle: dictToggle
  //       }
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setTestState(response.data.entryContent); // TODO - new branch
  //     });
    axios.get('http://127.0.0.1:5000', {
      headers: {
        'dict-language': dictLanguage
      }
    }).then((response) => {
      console.log(response);
      setTestState(response.data); 
    })
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
