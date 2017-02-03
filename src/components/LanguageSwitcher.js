import React, { PropTypes } from 'react';
import Base from './Base';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { localeSwitched } from './../actions/ApplicationActions';

import './../stylesheets/components/languageSwitcher.scss';

class LanguageSwitcher extends Base {

    onLanguageSwitch(locale) {
        let protocol = window.location.protocol;
        let host = window.location.host;
        let path = window.location.pathname;
        let parts = host.split(".");

        // Delete subdomain
        if (parts.length >= 2) {
            parts.splice(0, 1);
        }

        this.props.dispatch(localeSwitched(locale));

        // TODO: Add lang to url
        //browserHistory.push(path + "?lang=" + locale);
    }

    render() {
        let self = this;
        let locales = [];
        this.props.locales.forEach(function (locale) {
            locales.push(<li className={locale === self.props.locale ? "active": ""} key={locale} onClick={self.onLanguageSwitch.bind(self, locale)}><a className="btn btn-default">{locale}</a></li>);
        });
        if(this.props.locales.length > 1) {
            return (
                <ul className="language-switch">
                    {locales}
                </ul>
            );
        }
        return null;
    }

}

function mapStateToProps(state, props) {
    return {
        locale: state.application.locale,
        locales: state.application.locales
    }
}
export default connect(mapStateToProps)(LanguageSwitcher);