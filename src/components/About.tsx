import React from 'react';
import {Layout} from 'antd';

import {useTranslation} from 'react-i18next';
import AppConstants from '../AppConstants';

import quoiChromeWorkFlow from '../images/flow1-QUOI.png';

import './About.less';

const {Content} = Layout;  

const About: React.FC = () => {
    const {t} = useTranslation();

    const quoi = <span className="quoi">{AppConstants.App.TITLE}</span>;
    
    return (
    <Content className="main">
        <h1>What is <span className="main-header">{AppConstants.App.TITLE} </span>?</h1>
        <p>
            {quoi} is work-in-progress French-English dictionary that uses <a href="https://www.collinsdictionary.com/api/">The Collins Dictionary API</a> to fetch English-French terms and definitions.
            Orginally imagined as a Google Chrome extension, it has been redesigned and transformed into a web application using React and TypeScript.
        </p>

        <figure>
            {/*TODO - translate alt text!*/}
            <img src={quoiChromeWorkFlow} alt="diagram showing quoi's original workflow when it was originally meant to be a Chrome extension"/>
            <figcaption>
                {t('mock1Caption')}
            </figcaption>
        </figure>

        <div className="planned-features">
            <p>More features are planned and will soon be implemented, including: </p>
            <ul>
                <li>Favourite definitions</li>
                <li>Searchbar at header</li>
                <li>Cached preferences for language (English/French)</li>
                <li>Recently searched terms</li>
                <li>User profile</li>
                <li>Custom definitions</li>
                <li>Image uploads</li>
                </ul>
        </div>

        <p>If you have any comments or suggestions, contact the developer via email: <a href="mailto:patenio@ualberta.ca">patenio@ualberta.ca</a>.</p>
    </Content>
    )
}

export default About;