import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
// import logo from './logo.svg';
import HeaderComponent from './components/HeaderComponent';
import { Layout } from 'antd';
import MainHomepage from './components/MainHomepage';
import FooterComponent from './components/FooterComponent';
import About from './components/About';
import Entry from './components/Entry';

import { useTranslation } from 'react-i18next';

import AppConstants from './AppConstants';

import './App.less';
// import parse from 'html-react-parser'; // if using this, reinstall package

// TODO - styling remove .cit with #{word_id} and children "&nbsp"?

const { Content } = Layout;

const App: React.FC<any> = () => {
    const { t, i18n } = useTranslation();

    const history = useHistory();

    const [dictCode, setDictCode] = useState<string>(AppConstants.DictCode.EF); // To be sent to and used by API.
    const [isEnglishFrenchDict, setIsEnglishFrenchDict] = useState<boolean>(
        true
    ); // by default, set to English-French dictionary

    const handleClickSearch = (word: string | null) => {
        if (word === null || word.trim() === '') {
            console.log('no word');
        } else {
            history.push(`/search/${dictCode}/${word}`);
        }
    };

    const handleClickToggle = () => {
        if (dictCode === AppConstants.DictCode.EF) {
            setDictCode(AppConstants.DictCode.FE);
        } else {
            setDictCode(AppConstants.DictCode.EF);
        }
        setIsEnglishFrenchDict(!isEnglishFrenchDict);
    };

    const toggleText: string = isEnglishFrenchDict
        ? t('toggleLabel_en-fr')
        : t('toggleLabel_fr-en');

    const handleChangeLanguage = () => {
        if (i18n.language === 'en') {
            i18n.changeLanguage('fr');
        } else {
            i18n.changeLanguage('en');
        }
    };

    /* TODO
    Note that antd's ConfigProvider has locale support with it's own translated placeholders. Note that these can usually still be replaced via placeholder prop.
    This depends on the component. For now, let's use i18next! After implementing all translations, we can use ConfigProvider <div className=""></div>

    OR we use i18next provider if load language based on local storage (future concept)
  */

    // SEE HERE: https://fettblog.eu/typescript-react/components/
    // SEE HERE TOO: https://www.robinwieruch.de/react-function-component

    return (
        <div className="App">
            <HeaderComponent
                handleChangeLanguage={handleChangeLanguage}
                toggleText={toggleText}
                onToggle={handleClickToggle}
                onSearch={handleClickSearch}
            />
            <Content className="main" data-testid="main">
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => (
                            <MainHomepage
                                handleClickToggle={handleClickToggle}
                                toggleText={toggleText}
                                handleClickSearch={handleClickSearch}
                            />
                        )}
                    />
                    <Route path="/about" exact component={About} />
                    <Route
                        path="/search/:dictCode/:entryId"
                        component={Entry}
                    />
                </Switch>
            </Content>
            <FooterComponent />
        </div>
    );
};

export default App;
