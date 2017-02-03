import React, { PropTypes } from 'react';
import Base from './Base';

import './../stylesheets/components/contact.scss';

class Contact extends Base {

    render() {
        return (
            <section id={this.context.intl.formatMessage({id: "route.contact"})} className="contact" style={{ height: "500px"}}>
            </section>
        );
    }
}

Contact.contextTypes = {
    intl: PropTypes.object.isRequired
};

export default Contact;