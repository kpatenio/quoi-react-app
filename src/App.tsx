import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import logo from './logo.svg';
import HeaderComponent from './components/HeaderComponent';
import MainHomepage from './components/MainHomepage';
import FooterComponent from './components/FooterComponent';
import About from './components/About';
import Entry from './components/Entry';

import {I18nextProvider, useTranslation} from 'react-i18next';
import i18next from 'i18next';

import './App.less';
// import parse from 'html-react-parser'; // if using this, reinstall package
import entry from './mockedAssets/en-fr/entry';

// TODO - use TypeScript interfaces!
// TODO - styling remove .cit with #{word_id} and children "&nbsp"?

const App: React.FC = () => {
  const {t, i18n} = useTranslation();


  const handleChangeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('fr');
    } else {
      i18n.changeLanguage('en');
    }
  }

  /* TODO
    Note that antd's ConfigProvider has locale support with it's own translated placeholders. Note that these can usually still be replaced via placeholder prop.
    This depends on the component. For now, let's use i18next! After implementing all translations, we can use ConfigProvider <div className=""></div>

    OR we use i18next provider if load language based on local storage (future concept)
  */


  // SEE HERE: https://fettblog.eu/typescript-react/components/
  // SEE HERE TOO: https://www.robinwieruch.de/react-function-component


  return (
    <Router>
        <div className="App">
          <HeaderComponent handleChangeLanguage={handleChangeLanguage}/>
            <Switch>
              <Route path="/" exact component={MainHomepage} />
              <Route path="/about" exact component={About} />
              <Route path="/search/:dictCode/:entryId" component={Entry} />
            </Switch>
          <FooterComponent/>
        </div>
    </Router>
  );
}

export default App;
