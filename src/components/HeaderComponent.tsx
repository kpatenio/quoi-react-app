import React from 'react';
import { Layout, Button, Icon } from 'antd';

import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch, match } from 'react-router-dom';
import AppConstants from '../AppConstants';
import SearchBar from './SearchBar';

import './HeaderComponent.less';

const { Header } = Layout;

// // Think of this a React proptypes
// type HeaderComponentProps = {
//     handleChangeLanguage: React.MouseEventHandler, // onClick is an event handler for a button, NOT a function type! See: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet
// }

// TODO - change prop args
const HeaderComponent: React.FC<any> = props => {
    const { t } = useTranslation();
    const match: match | null = useRouteMatch('/');

    let searchbar = null;

    // Read current path of page and see if the path is set to the homepage.
    // If current page is homepage, do not render header searchbar (which is null by default).
    // Otherwise, render the searchbar as the provided JSX elements.
    if (match && !match.isExact) {
        searchbar = (
            <div>
                <Button
                    className="toggle"
                    ghost
                    size="small"
                    onClick={props.onToggle}
                >
                    <Icon type="swap" />
                </Button>
                <SearchBar
                    className="searchbar"
                    isHomepage={false}
                    size="small"
                    placeholder={props.toggleText}
                    onSearch={props.onSearch}
                />
            </div>
        );
    }

    return (
        <Header data-testid="header" className="header">
            <span className="logo">
                <Link data-testid="header-logo" className="home" to="/">
                    {AppConstants.App.TITLE}
                </Link>
            </span>

            <nav>
                <ul>
                    <li>
                        <Link data-testid="header-about" to="/about">
                            {t('about')}
                        </Link>
                    </li>
                </ul>
            </nav>

            {searchbar}

            <Button
                data-testid="header-toggle"
                ghost
                className="languageUIToggle"
                onClick={props.handleChangeLanguage}
            >
                {t('languageToggle')}
            </Button>
        </Header>
    );
};

export default HeaderComponent;
