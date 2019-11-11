import React, {useState, useEffect} from 'react';
// import {Layout, Button} from "antd";
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import DOMPurify from 'dompurify';

import './Entry.less';

const sanitizer = DOMPurify.sanitize;

const Entry: React.FC<any> = ({match}) => {  
    // TODO - make response call after redirecting to term page. Otherwise, how would we pass response?

    const {t} = useTranslation();

    // TODO - use match
    // see here at this timestamp: https://youtu.be/Law7wfdg_ls?t=1788
    
    console.log(match);

    const [entry, setEntry] = useState();

    // ComponentDidMount
    useEffect(() => {
        // FIXME - issue with how to get dictCode? Maybe pass to search/{dictCode}/{term}?
        axios.get(`http://127.0.0.1:5000/${match.params.dictCode}/${match.params.entryId}`)
        .then((response) => {
            console.log(response);
            if (!response.data.hasOwnProperty('suggestions')) {
                console.log("valid entry");
                setEntry(response.data.entryContent);

            } else { // here entryId && entryLabel && entryUrl should be non-existant
                // TODO - use a new component or tag to display list of suggestions
                // setTestState(`No results available for '${word}' ${sadFaceEmoji} \n Did you mean ${response.data.suggestions} ?`);
                console.log('invalid entry');
            }
        })
    })

        //   .catch(() => {
              // TODO - make error call for actual non-mocked calls
              // TODO - this catch is called if 1. server is offline OR 2.
              // TODO - say "unable to search for <word> at this time" instead of offline server
            //   setTestState(`The server is currently offline. ${sadFaceEmoji} Please try again later.`);
        //   })



    return (
        <React.Fragment>
            <p>This is term entry page!</p>
            <div className="content" dangerouslySetInnerHTML={{ __html: sanitizer(entry) }} />
        </React.Fragment>
    )
}

export default Entry;