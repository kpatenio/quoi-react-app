import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout, Button, Icon, Tooltip, Input} from "antd";

import {I18nextProvider, useTranslation} from 'react-i18next';
import DOMPurify from 'dompurify';
import axios from 'axios';

import './MainHomepage.less';

const {Content} = Layout;
const {Search} = Input;
const sanitizer = DOMPurify.sanitize;

// FIXME - use proper types of useRouter. This is a temp hack.
const MainHomepage: React.FC<any> = (props) => {
    const title = '« quoi »'; // TODO - make this a constant! + separate component for title
    const {t} = useTranslation();
    console.log(props.history);

    const history = props.history;

    // const content: string = entry.entryContent // temporary content!
    const sadFaceEmoji: string = '&#128542'
  
    // TODO
    // use useEffect to use values instead of hardcoding here?
    // this is to replicate ComponentDidMount
    // const [testState, setTestState] = useState<string>('');
    const [dictCode, setDictCode] = useState<string>('english-french'); // To be sent to and used by API.
    const [isEnglishFrenchDict, setIsEnglishFrenchDict] = useState<boolean>(true); // by default, set to English-French dictionary

    useEffect(() => {
        // ComponentWillUnmount using React Hooks' useEffect
        return () => console.log("Unmounted homepage!");
    }, []);
  
    const getContent = (word: string | null) => {
        history.push(`/search/${dictCode}/${word}`);

    //   axios.get(`http://127.0.0.1:5000/${dictCode}/${word}`)
    //     .then((response) => {
    //         console.log(response);
    //         if (!response.data.hasOwnProperty('suggestions')) {
    //             // setTestState(response.data.entryContent);
    //             console.log("valid entry");
    //             // TODO - make response call after redirecting to term page. Otherwise, how would we pass response?
    //             history.push(`/search/${response.data.entryId}`);

    //             // TODO - history.push to search/entryId
    //             // TODO - if entry doesn't exist, redirect to an error page OR do not go through

    //         } else { // here entryId && entryLabel && entryUrl should be non-existant
    //             // TODO - use a new component or tag to display list of suggestions
    //             // setTestState(`No results available for '${word}' ${sadFaceEmoji} \n Did you mean ${response.data.suggestions} ?`);
    //             console.log('invalid entry');
    //             // console.log(`No results available for '${word}' ${sadFaceEmoji} \n Did you mean ${response.data.suggestions} ?`);

    //         }
    //     })
    //     // .catch(() => {
    //     //     // TODO - make error call for actual non-mocked calls
    //     //     // TODO - this catch is called if 1. server is offline OR 2.
    //     //     // TODO - say "unable to search for <word> at this time" instead of offline server
    //     //     setTestState(`The server is currently offline. ${sadFaceEmoji} Please try again later.`);
    //     // })
    }
  
    const handleClickSearch = (word: string | null) => {
      if (word === null || word.trim() === "") {
        // setTestState(t('enterWord'))
        console.log("no word");
      } else {
        getContent(word);
      }
    }
  
    const handleClickToggle = () => {
      if (dictCode === 'english-french') {
        setDictCode('french-english')
      } else {
        setDictCode('english-french');
      }
      setIsEnglishFrenchDict(!isEnglishFrenchDict);
    }

    const toggleText: string = isEnglishFrenchDict ? t('toggleLabel_en-fr') : t('toggleLabel_fr-en');

    return (
        <Content className="main">
            <hgroup className="titleHeader">
                <h1 id="title"> {title} </h1>
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

            {/* <div dangerouslySetInnerHTML={{ __html: sanitizer(testState) }} /> */}
        </Content>
    )
}

export default withRouter(MainHomepage);