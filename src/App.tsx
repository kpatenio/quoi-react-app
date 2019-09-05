import React, {useState, useEffect} from 'react';
import {Button, Icon, Tooltip, Input} from "antd";
// import logo from './logo.svg';

import {I18nextProvider, useTranslation} from 'react-i18next';
import i18next from 'i18next';

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
  const sadFaceEmoji = '&#128542'
  const {t, i18n} = useTranslation();
  // TODO - change to proper state
  const [testState, setTestState] = useState();

  const [dictCode, setDictCode] = useState('english-french'); // To be sent to and used by API.
  const [toggleText, setToggleText] = useState(t('toggleLabel_en-fr')); 

  const sanitizer = DOMPurify.sanitize; // TODO - use more of this

  const getContent = (word: string) => {
    axios.get(`http://127.0.0.1:5000/${dictCode}/${word}`)
    .then((response) => {
      console.log(response);
        if (!response.data.hasOwnProperty('suggestions')) {
          setTestState(response.data.entryContent);
        } else {
          // TODO - use a new component or tag to display list of suggestions
          setTestState(`No results available for '${word}' ${sadFaceEmoji} \n Did you mean ${response.data.suggestions} ?`);
        }
    })
    .catch(() => {
      // TODO - make error call for actual non-mocked calls
      // TODO - this catch is called if 1. server is offline OR 2.
      // TODO - say "unable to search for <word> at this time" instead of offline server
      setTestState(`The server is currently offline. ${sadFaceEmoji} Please try again later.`);
    })
  }

  const handleChangeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('fr');
    } else {
      i18n.changeLanguage('en');
    }

    // TODO - refactor!!
    if (dictCode === 'english-french') {
      setToggleText(t('toggleLabel_en-fr'))
    } else {
      setToggleText(t('toggleLabel_fr-en'))      
    }
  }

  const handleClickSearch = (word: string) => {
    if (word === null || word.trim() === "") {
      setTestState('Please enter a word.')
    } else {
      getContent(word);
    }
  }

  const handleClickToggle = () => {
    // update dictCode
    if (dictCode === 'english-french') {
      setDictCode('french-english')
    } else {
      setDictCode('english-french');
    }

    // update button language toggle label
    // TODO - refactor!
    if (toggleText === t('toggleLabel_en-fr')) {
      setToggleText(t('toggleLabel_fr-en'));
    } else {
      setToggleText(t('toggleLabel_en-fr'))
    }
}

  const {Search} = Input;

  /* TODO
    Note that antd's ConfigProvider has locale support with it's own translated placeholders. Note that these can usually still be replaced via placeholder prop.
    This depends on the component. For now, let's use i18next! After implementing all translations, we can use ConfigProvider 
  */
  return (
      <div className="App">
        <Button data-testid="language" onClick={handleChangeLanguage}>
          {t('languageToggle')}
        </Button>
        <header className="App-header">
        <h1>
          {t('welcome')}
        </h1>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Tooltip placement="topLeft" title={t('tooltipTitle')}>
            <Button data-testid="toggle" onClick={handleClickToggle} type="primary">
              {toggleText}
              <Icon type="swap" />
            </Button>
          </Tooltip>
          <Search
            className="searchbar"
            placeholder={t('searchbarPlaceholder')} 
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
