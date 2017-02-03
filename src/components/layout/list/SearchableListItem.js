import React, { PropTypes } from 'react';
import Base from './../../Base';

import './../../../stylesheets/components/layout/list/searchableListItem.scss';

export default class SearchableListItem extends Base {

    render() {
        let { listItem } = this.props;
        let listElements = [];
        for(let key in listItem){
            listElements.push(<li key={key}><span className="key">{key}</span> - {listItem[key] !== null ? listItem[key].toString() : "null"}</li>);
        }
        return (
            <ul className="searchable-list-item">
                {listElements}
            </ul>
        );
    }
}
