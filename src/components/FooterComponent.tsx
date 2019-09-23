import React from 'react';
import {Layout} from "antd";

import {I18nextProvider, useTranslation, Trans} from 'react-i18next';
import i18next from 'i18next';

import './FooterComponent.less';

// TODO import and use consts for i18next

const {Footer} = Layout;

const FooterComponent: React.FC = () => {
    return (
        <Footer className="footer">
            {/* //TODO - what are target and rel? */}
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </Footer>
    )
}

export default FooterComponent;