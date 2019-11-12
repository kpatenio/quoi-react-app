import React, {useState, useEffect} from 'react';
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

const Entry: React.FC<any> = ({match}) => {  

    const {t, i18n} = useTranslation();    
    const [entry, setEntry] = useState(match.params.entryLabel);
    const [isValidInput, setisValidInput] = useState<boolean>(true);

    // ComponentDidMount
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/${match.params.dictCode}/${match.params.entryId}`)
        .then((response) => {
            console.log(response);
            if (!response.data.hasOwnProperty('suggestions')) {
                console.log("valid entry");

                setEntry(response.data.entryContent);
                setisValidInput(true);

            } else {
                // TODO - use a new component or tag to display list of suggestions?
                // TODO - add a button to try again or show dictionary suggestions!
                console.log('invalid entry');

                setEntry(`${t('noWord')}: "${response.data.searchTerm}".`)
                setisValidInput(false);
                invalidEntry = response.data.searchTerm;
            }
        })
        
        .catch(() => {
            setEntry(`${t('serverError')} ${AppConstants.App.SAD_FACE_EMOJI}`);
            isError = true;
        })
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
        
    return (
        <Content>
            <div className="content" dangerouslySetInnerHTML={{ __html: sanitizer(entry) }} />
        </Content>
    )
}

export default Entry;