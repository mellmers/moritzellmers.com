import React, { PropTypes } from 'react';
import Base from './../components/Base';
import { IndexLink } from 'react-router';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import About from './../components/About';
import Contact from './../components/Contact';
import Portfolio from './../components/Portfolio';
import Skills from './../components/Skills';

import '../stylesheets/views/home.scss';

export default class Home extends Base {

    componentDidMount() {
        $(".parallax-window.start").parallax({imageSrc: "/assets/img/home/office_1920x1440.jpg"});
        $(".parallax-window.project").parallax({imageSrc: "/assets/img/home/project_1920x1280.jpg"});
        $(".parallax-window.ipad").parallax({imageSrc: "/assets/img/home/ipad_1920x1275.jpg"});
        $(".parallax-window.contact").parallax({imageSrc: "/assets/img/home/contact_1920x1280.jpg"});
    }

    componentWillUnmount() {
        $(".parallax-mirror").remove();
    }

    render() {
        return (
            <div className="view home">
                <div className="parallax-window start text-center">
                    <h1><FormattedHTMLMessage id="view.home.banner" /></h1>
                </div>
                <div className="next-section">
                    <h3><FormattedMessage id="view.home.skills" /></h3>
                    <IndexLink to="/" hash={"#" + this.context.intl.formatMessage({id: "route.skills"})}
                               onClick={this.scrollToSection.bind(this)}
                               className="btn btn-primary btn-fab btn-fab-mini">
                        <i className="material-icons">&#xE5CF;</i>
                    </IndexLink>
                </div>
                <Skills />
                <div className="parallax-window project"></div>
                <div className="next-section">
                    <h3><FormattedMessage id="view.home.portfolio" /></h3>
                    <IndexLink to="/" hash={"#" + this.context.intl.formatMessage({id: "route.portfolio"})}
                               onClick={this.scrollToSection.bind(this)}
                               className="btn btn-primary btn-fab btn-fab-mini">
                        <i className="material-icons">&#xE5CF;</i>
                    </IndexLink>
                </div>
                <Portfolio />
                <div className="parallax-window ipad"></div>
                <div className="next-section">
                    <h3><FormattedMessage id="view.home.about" /></h3>
                    <IndexLink to="/" hash={"#" + this.context.intl.formatMessage({id: "route.about"})}
                               onClick={this.scrollToSection.bind(this)}
                               className="btn btn-primary btn-fab btn-fab-mini">
                        <i className="material-icons">&#xE5CF;</i>
                    </IndexLink>
                </div>
                <About />
                <div className="parallax-window contact"></div>
                <div className="next-section">
                    <h3><FormattedMessage id="view.home.contact" /></h3>
                    <IndexLink to="/" hash={"#" + this.context.intl.formatMessage({id: "route.contact"})}
                               onClick={this.scrollToSection.bind(this)}
                               className="btn btn-primary btn-fab btn-fab-mini">
                        <i className="material-icons">&#xE5CF;</i>
                    </IndexLink>
                </div>
                <Contact />
            </div>
        );
    }
}

Home.contextTypes = {
    intl: PropTypes.object.isRequired
};