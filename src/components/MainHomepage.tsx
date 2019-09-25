import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Layout, Button, Icon, Tooltip, Input} from "antd";

import {I18nextProvider, useTranslation} from 'react-i18next';
import DOMPurify from 'dompurify';

import './MainHomepage.less';

const {Content} = Layout;
const {Search} = Input;
const sanitizer = DOMPurify.sanitize;

type MainHomepageProps = { // TODO specific types
    handleClickToggle: any,
    toggleText: any,
    handleClickSearch: any,
    testState: any,
}

const MainHomepage: React.FC<MainHomepageProps> = ({handleClickToggle, toggleText, handleClickSearch, testState}) => {
    const title = '« quoi »';
    const {t} = useTranslation();

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

            <div dangerouslySetInnerHTML={{ __html: sanitizer(testState) }} />
        </Content>
    )
}

export default MainHomepage;