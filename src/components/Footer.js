import React, { PropTypes } from 'react';
import Base from './../components/Base';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import './../stylesheets/components/footer.scss';

export default class Footer extends Base {

    render() {
        return (
        <footer className="footer">
            <div className="container">
                <a href="mailto:moritz.ellmers@web.de"><i className="fa fa-envelope-square" /></a>
                <a href="https://github.com/mellmers"><i className="fa fa-github-square" /></a>
                <a href="https://www.facebook.com/mo.elmrs"><i className="fa fa-facebook-square" /></a>
                <a href="https://www.xing.com/profile/Moritz_Ellmers"><i className="fa fa-xing-square" /></a>
                <a href="https://de.linkedin.com/pub/moritz-ellmers/106/176/8aa"><i className="fa fa-linkedin-square" /></a>
                <Link to={this.context.intl.formatMessage({ id: "route.imprint" })} className="btn btn-default pull-right"><FormattedMessage id="components.footer.imprint" /></Link>
            </div>
        </footer>
        );
    }
}

Footer.contextTypes = {
    intl: PropTypes.object.isRequired
};