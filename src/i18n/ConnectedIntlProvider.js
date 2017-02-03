import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addLocaleData, IntlProvider} from 'react-intl';

import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';

import * as i18n from './index';

import {localeSwitched} from './../actions/ApplicationActions';

addLocaleData([...en, ...de]);

// If browser doesn't support Intl (i.e. Safari), then we manually import
// the intl polyfill and locale data.
if (!window.intl) {
    require.ensure([
        'intl',
        'intl/locale-data/jsonp/en.js',
        'intl/locale-data/jsonp/de.js'
    ], (require) => {
        require('intl');
        require('intl/locale-data/jsonp/en.js');
        require('intl/locale-data/jsonp/de.js');
    });
}

class ConnectedIntlProvider extends Component {

    componentWillMount() {
        //console.log(this.props.locale);
        let host = window.location.host;
        let parts = host.split(".");

        // Delete subdomain
        //console.log(parts, this.props.locales.indexOf(parts[0]));
        if (parts.length >= 2) {
            if (this.props.locales.indexOf(parts[0]) > -1) {
                this.props.dispatch(localeSwitched(parts[0]));
            }
        } else if (this.props.locale === "") {
            let language = (navigator.languages && navigator.languages[0]) ||
                navigator.language ||
                navigator.userLanguage;

            // Split locales with a region code
            let languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
            this.props.dispatch(localeSwitched(languageWithoutRegionCode));
        }
    }

    render() {
        return (
            <IntlProvider locale={this.props.locale || "de"} messages={i18n[this.props.locale || "de"]}>
                {this.props.children}
            </IntlProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        locale: state.application.locale,
        locales: state.application.locales
    };
}

export default connect(mapStateToProps)(ConnectedIntlProvider);