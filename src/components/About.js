import React, { PropTypes } from 'react';
import Base from './Base';

class About extends Base {

    render() {
        return (
            <section id={this.context.intl.formatMessage({id: "route.about"})} className="about container" style={{ height: "500px"}}>
            </section>
        );
    }
}

About.contextTypes = {
    intl: PropTypes.object.isRequired
};

export default About;