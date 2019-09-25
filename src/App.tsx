import React, {useState, useEffect, useImperativeHandle} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Layout, Button, Icon, Tooltip, Input} from "antd";
// import logo from './logo.svg';
import HeaderComponent from './components/HeaderComponent';
import MainHomepage from './components/MainHomepage';
import FooterComponent from './components/FooterComponent';

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
  const {t, i18n} = useTranslation();

  // const content: string = entry.entryContent // temporary content!
  const sadFaceEmoji: string = '&#128542'

  
  const [testState, setTestState] = useState<string>('');

  const [dictCode, setDictCode] = useState<string>('english-french'); // To be sent to and used by API.
  const [toggleText, setToggleText] = useState<string>(t('toggleLabel_en-fr')); 

  const getContent = (word: string | null) => {
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

  const handleClickSearch = (word: string | null) => {
    if (word === null || word.trim() === "") {
      setTestState(t('enterWord'))
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


  /* TODO
    Note that antd's ConfigProvider has locale support with it's own translated placeholders. Note that these can usually still be replaced via placeholder prop.
    This depends on the component. For now, let's use i18next! After implementing all translations, we can use ConfigProvider 
  */


  // SEE HERE: https://fettblog.eu/typescript-react/components/
  // SEE HERE TOO: https://www.robinwieruch.de/react-function-component


  return (
    <Router>
    <div className="App">
      <HeaderComponent handleChangeLanguage={handleChangeLanguage}/> 
      <MainHomepage 
        handleClickToggle={handleClickToggle}
        toggleText={toggleText}
        handleClickSearch={handleClickSearch}
        testState={testState}
      />
      <FooterComponent/>
    </div>
    </Router>
  );
}

export default App;
