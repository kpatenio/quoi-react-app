import React from 'react';
// import {Layout, Button} from "antd";

import {useTranslation} from 'react-i18next';

// import './HeaderComponent.less';

// const {Header} = Layout;


const About: React.FC = () => {
    const {t} = useTranslation();
    
    return (
    <p>This is the about page!</p>
    )
}

export default About;