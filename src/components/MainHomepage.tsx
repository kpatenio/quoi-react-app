import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout, Button, Icon, Tooltip, Input} from "antd";
import {useTranslation} from 'react-i18next';

import AppConstants from '../AppConstants';

import './MainHomepage.less';
import App from '../App';

const {Content} = Layout;
const {Search} = Input;

// FIXME - use proper types of useRouter. This is a temp hack.
const MainHomepage: React.FC<any> = (props) => {
    const {t} = useTranslation();
    const history = props.history;
  
    // TODO
    // use useEffect to use values instead of hardcoding here?
    const [dictCode, setDictCode] = useState<string>(AppConstants.DictCode.EF); // To be sent to and used by API.
    const [isEnglishFrenchDict, setIsEnglishFrenchDict] = useState<boolean>(true); // by default, set to English-French dictionary

    useEffect(() => {
        // ComponentWillUnmount using React Hooks' useEffect
        return () => console.log("Unmounted homepage!");
    }, []);
  
    const getContent = (word: string | null) => {
        history.push(`/search/${dictCode}/${word}`);
    }
  
    const handleClickSearch = (word: string | null) => {
      if (word === null || word.trim() === "") {
        console.log("no word");
      } else {
        getContent(word);
      }
    }
  
    const handleClickToggle = () => {
      if (dictCode === AppConstants.DictCode.EF) {
        setDictCode(AppConstants.DictCode.FE)
      } else {
        setDictCode(AppConstants.DictCode.EF);
      }
      setIsEnglishFrenchDict(!isEnglishFrenchDict);
    }

    const toggleText: string = isEnglishFrenchDict ? t('toggleLabel_en-fr') : t('toggleLabel_fr-en');

    return (
        <Content className="main">
            <hgroup className="titleHeader">
                <h1 id="title"> {AppConstants.App.TITLE} </h1>
                <h2 id="slogan"> {t("slogan")} </h2>
            </hgroup>
            
            <div className="searchContainer">
                <Tooltip placement="left" title={t("tooltipTitle")}>
                    <Button
                        className="dictionaryToggle"
                        data-testid="dictionaryToggle"
                        onClick={handleClickToggle}
                        type="primary"
                    >
                        {toggleText}
                        <Icon type="swap" />
                    </Button>
                </Tooltip>
                <Search
                    size="large"
                    className="searchbar"
                    placeholder={t("searchbarPlaceholder")}
                    onSearch={handleClickSearch}
                />
            </div>
        </Content>
    )
}

export default withRouter(MainHomepage);