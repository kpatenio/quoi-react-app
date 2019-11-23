import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Layout } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';

import AppConstants from '../AppConstants';

import './Entry.less';

const sanitizer = DOMPurify.sanitize;
let invalidEntry: string;
let isError: boolean = false;

const Entry: React.FC<any> = ({ match }) => {
    const { t, i18n } = useTranslation();
    const [entry, setEntry] = useState();
    const [isValidInput, setisValidInput] = useState<boolean>(true);
    const [recentUrl, setRecentUrl] = useState<string>(match.url);

    const getContent = (dictCode: string, entryId: string) => {
        console.log(
            `calling API for entry ${entryId} and dictionary type ${dictCode}`
        );

        axios
            .get(`http://127.0.0.1:5000/${dictCode}/${entryId}`)
            .then(response => {
                if (!response.data.hasOwnProperty('suggestions')) {
                    console.log('valid entry');

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
                setEntry(
                    `${t('serverError')} ${AppConstants.App.SAD_FACE_EMOJI}`
                );
                isError = true;
            });
    };

    // ComponentDidMount
    useEffect(() => {
        setRecentUrl(match.url);
        getContent(match.params.dictCode, match.params.entryId);
    }, []);

    // ComponentDidUpdate
    // Check if translation for error message needs to be updated after displaying it.
    useEffect(() => {
        if (!isValidInput && invalidEntry) {
            setEntry(`${t('noWord')}: "${invalidEntry}"`);
        } else if (isError) {
            setEntry(`${t('serverError')}${AppConstants.App.SAD_FACE_EMOJI}`);
        }
    }, [i18n.language]);

    // Check if new entry has been searched
    useEffect(() => {
        // Changing the language will cause the the entry state to be updated.
        // To prevent getContent being called whenever we change the language
        // we can instead detect if the route has changed via the "match" parameters from react router.
        if (recentUrl !== match.url) {
            setRecentUrl(match.url);
            getContent(match.params.dictCode, match.params.entryId);
        }
    }, [match]);

    return (
        <div data-testid="entry">
            <div
                className="content"
                dangerouslySetInnerHTML={{ __html: sanitizer(entry) }}
            />
        </div>
    );
};

export default Entry;
