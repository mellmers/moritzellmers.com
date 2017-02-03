import React, { PropTypes } from 'react';
import Base from './../../Base';

import SearchInput, { createFilter } from 'react-search-input';

import './../../../stylesheets/components/layout/list/searchableListView.scss';

export default class SearchableListView extends Base {

    /*
    static propTypes = {
        filters: PropTypes.array.isRequired
    };
    */

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props.items, nextProps.items)
            || this.state.searchTerm !== nextState.searchTerm;
    }

    searchUpdated (term) {
        this.setState({searchTerm: term});
    }

    renderListItems(items) {
        let elements = [];
        if(items) {
            for (let i = 0, length = items.length; i < length; i++) {
                elements.push(React.createElement(this.props.listElement, { key: i, listItem: items[i] } ));
            }
        }
        return elements;
    }

    render() {
        let { items, filters } = this.props;
        if(items) {
            items = items.filter(createFilter(this.state.searchTerm, filters));
        }
        let placeholderText = "Durchsuche nach";
        for(let i = 0, length = filters.length; i < length; i++) {
            placeholderText += " " + filters[i].capitalize() + (i+1 < length ? "," : "");
        }
        return (
            <div className="searchable-list-view">
                <SearchInput className="search-input" placeholder={placeholderText} onChange={this.searchUpdated.bind(this)} />
                {this.renderListItems(items)}
            </div>
        );
    }
}
