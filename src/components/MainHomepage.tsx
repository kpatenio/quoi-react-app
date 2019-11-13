import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout, Button, Icon, Tooltip, Input} from "antd";
import {useTranslation} from 'react-i18next';

import SearchBar from './SearchBar';

import AppConstants from '../AppConstants';

import './MainHomepage.less';

const {Content} = Layout;
const {Search} = Input;

const MainHomepage: React.FC<any> = (props) => {
    const {t} = useTranslation();
  
    useEffect(() => {
        // ComponentWillUnmount using React Hooks' useEffect
        return () => console.log("Unmounted homepage!");
    }, []);

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
                        onClick={props.handleClickToggle}
                        type="primary"
                    >
                        {props.toggleText}
                        <Icon type="swap" />
                    </Button>
                </Tooltip>
                <SearchBar
                    size="large"
                    className="searchbar"
                    placeholder={t("searchbarPlaceholder")}
                    onSearch={props.handleClickSearch}
                />
            </div>
        </Content>
    )
}

export default MainHomepage;