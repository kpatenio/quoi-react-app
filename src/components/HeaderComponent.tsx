import React from 'react';
import {Layout, Button} from "antd";

import {useTranslation} from 'react-i18next';

import './HeaderComponent.less';

import {Link} from 'react-router-dom';

const {Header} = Layout;

// Think of this a React proptypes
type HeaderComponentProps = {
    handleChangeLanguage: React.MouseEventHandler, // onClick is an event handler for a button, NOT a function type! See: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({handleChangeLanguage}) => {
    const {t} = useTranslation();
    
    return (
    <Header className="header">
{/* 
<Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        defaultSelectedKeys={['home']}
      >
        <Menu.Item key="home"><Link className="home" to='/'>Home</Link></Menu.Item>        
        <Menu.Item key="about"><Link className="about" to='/about'>About</Link></Menu.Item>

    </Menu> */}

        <span className="logo">
            <Link className="home" to='/'>« quoi »</Link>
        </span>

        <nav>
            <ul>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </nav>

        {/*TODO - determine button*/}
        <Button
            ghost
            data-testid="languageUIToggle"
            className="languageUIToggle"
            onClick={handleChangeLanguage}
        >
            {t("languageToggle")}
        </Button>
    </Header>
    )
}

export default HeaderComponent;