import React, {useState, useEffect} from 'react';
import {Button, Icon, Tooltip, Input} from "antd";
import {useTranslation} from 'react-i18next';

import AppConstants from '../AppConstants';

const {Search} = Input;

// FIXME - use proper typing. Temporary workaround for now.
const SearchBar: React.FC<any> = (props) => {
    const {t} = useTranslation();

    let placeholder;

    if (props.placeholder) {
        placeholder = props.placeholder;
    } else {
        placeholder = t("searchbarPlaceholder");
    }

    const className = props.isHomepage ? "searchbar-homepage" : "searchbar-header"

    return (
        <React.Fragment>
            <Search
                data-testid={className}
                className={className}
                placeholder={placeholder}
                onSearch={props.onSearch}
                size={props.size}
            />
        </React.Fragment>
    )
}

// export default withRouter(SearchBar);
export default SearchBar;