import React from 'react';
import {Layout, Icon} from "antd";

import {I18nextProvider, useTranslation, Trans} from 'react-i18next';
import i18next from 'i18next';

import './FooterComponent.less';

// TODO import and use consts for i18next

const {Footer} = Layout;

const FooterComponent: React.FC = () => {
    return (
        <Footer className="footer">
            <div className="github">
                <Icon type="github" className="github-logo"/>
                {/* Info about anchor tag and its attributes: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a */}
                <a
                    id="github-profile"
                    href="https://github.com/kpatenio"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    kpatenio
                </a>
            </div>
            <div className="api-footer"> {/* TODO - translate this */}
                <p id="api-message"> Search results are provided by: <span id="api-copyright">www.Collinsdictionary.com © HarperCollins Publishers Ltd 2014 </span></p>
            </div>
        </Footer>
    )
}

export default FooterComponent;