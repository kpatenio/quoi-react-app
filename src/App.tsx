import React, {useState, useEffect} from 'react';
import {Button, Icon, Tooltip, Input} from "antd";
import logo from './logo.svg';
// import './App.css';
import './App.less';
import axios from 'axios';
import DOMPurify from 'dompurify';
// import parse from 'html-react-parser'; // if using this, reinstall package
import entry from './mockedAssets/en-fr/entry';

// TODO - use TypeScript interfaces!
// TODO - use SCSS and given classnames to change styling
// TODO - styling remove .cit with #{word_id} and children "&nbsp"?

const App: React.FC = () => {
  const content: string = entry.entryContent // temporary content!
  // TODO - change to proper state
  const [testState, setTestState] = useState('Welcome to QUOI!');

  // To be sent to and used by API.
  // TODO - use i18n instead of dictLanguage for button text
  const [dictLanguage, setDictLanguage] = useState('english-french');

  const sanitizer = DOMPurify.sanitize; // TODO - use more of this

  const handleClickTest = () => {
    // TODO - use i18n instead of dictLanguage for button text
    // TODO - for toggles, instead of comparing text, maybe we can instead compare ids.
    // ex. ids can be 'en-fr', 'fr-en'
    if (dictLanguage === 'english-french') {
      setDictLanguage('french-english');
    } else if (dictLanguage === 'french-english') {
      setDictLanguage('english-french');
    } else {
      setDictLanguage('what lol');
    }
  };

  const handleClickSearch = (word: string) => {
    if (word === null || word.trim() === "") {
      setTestState('Please enter a word.')
    } else {
      getContent(word);
    }
  }

  const getContent = (word: string) => {
    axios.get(`http://127.0.0.1:5000/${dictLanguage}/${word}`)
    .then((response) => {
      console.log(response);
        if (!response.data.hasOwnProperty('suggestions')) {
          setTestState(response.data.entryContent);
        } else {
          // TODO - use a new component or tag to display list of suggestions
          setTestState(`No results available for '${word}' &#128542 \n Did you mean ${response.data.suggestions} ?`);
        }
    })
    .catch(() => {
      // TODO - make error call for actual non-mocked calls
      // TODO - this catch is called if 1. server is offline OR 2.
      // TODO - say "unable to search for <word> at this time" instead of offline server
      setTestState(`The server is currently offline. &#128542 Please try again later.`);
    })
  }

  const {Search} = Input;
  return (
      <div className="App">
        <header className="App-header">
          <p className="first">Hello there!</p>
          <p className="second">How are you?</p>
          <img src={logo} className="App-logo" alt="logo" />
          <Tooltip placement="topLeft" title="Click here to swap languages!">
            <Button onClick={handleClickTest} type="primary">
              {dictLanguage}
              <Icon type="swap" />
            </Button>
          </Tooltip>
          <Search
            className="searchbar"
            placeholder="Search for a word" 
            onSearch={handleClickSearch} 
          />

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
