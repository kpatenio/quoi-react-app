import React, {useState, useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Layout} from "antd";
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import DOMPurify from 'dompurify';

import AppConstants from '../AppConstants';

import './Entry.less';

const sanitizer = DOMPurify.sanitize;
const {Content} = Layout;
let invalidEntry : string;
let isError : boolean = false;

// TODO - figure out how to not use window.reload to make new searches appear.
// Perhaps we can render a separate component for error messages and have it appear only when invalid input is made.
// That said, entry value still changes whenever we make an axios call. This will still be an issue!


const Entry: React.FC<any> = ({match}) => {  
    const {t, i18n} = useTranslation();    
    const [entry, setEntry] = useState();
    const [isValidInput, setisValidInput] = useState<boolean>(true);
    const [recentUrl, setRecentUrl] = useState<string>(match.url);

    const getContent = () => {
        axios.get(`http://127.0.0.1:5000/${match.params.dictCode}/${match.params.entryId}`)
        .then((response) => {
            if (!response.data.hasOwnProperty('suggestions')) {
                console.log("valid entry");

                setEntry(response.data.entryContent);
                setisValidInput(true);

            } else {
                // TODO - use a new component or tag to display list of suggestions?
                // TODO - add a button to try again or show dictionary suggestions!
                console.log('invalid entry');

                setEntry(`${t('noWord')}: "${response.data.searchTerm}".`);
                setisValidInput(false);
                invalidEntry = response.data.searchTerm;
            }
         })
        .catch(() => {
            setEntry(`${t('serverError')} ${AppConstants.App.SAD_FACE_EMOJI}`);
            isError = true;
        })
    }

    // ComponentDidMount
    useEffect(() => {
        getContent();
    }, [])

    // ComponentDidUpdate
    // Check if translation for error message needs to be updated after displaying it.
    useEffect(() => {
        if (!isValidInput && invalidEntry) {
            setEntry(`${t('noWord')}: "${invalidEntry}"`);
        } else if (isError) {
            setEntry(`${t('serverError')}${AppConstants.App.SAD_FACE_EMOJI}`);
        }
    }, [i18n.language])

    // Check if new entry has been searched
    useEffect(() => {
        console.log(match);
        console.log(recentUrl);
    }, [entry])
        
    return (
        <Content>
            <div className="content" dangerouslySetInnerHTML={{ __html: sanitizer(entry) }} />
        </Content>
    )
}

export default Entry;