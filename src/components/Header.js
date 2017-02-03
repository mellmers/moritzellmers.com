import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import Base from './../components/Base';
import {IndexLink, Link} from 'react-router';
import LanguageSwitcher from './../components/LanguageSwitcher';

import './../stylesheets/components/header.scss';

export default class Header extends Base {

    componentDidMount() {
        let self = this;

        this.checkActiveSection(0);
        $(window).on('scroll', function () {
            self.checkActiveSection($(this).scrollTop());
        });

        $(window).on("scroll", function () {
            if ($(window).scrollTop() >= 170) {
                $("header .links").addClass("navbar-fixed-top");
                $("header .links > div").removeClass("container").addClass("container-fluid");
                $("#app .content").css("padding-top", "81px");
            } else {
                $("header .links").removeClass("navbar-fixed-top");
                $("header .links > div").addClass("container").removeClass("container-fluid");
                $("#app .content").css("padding-top", "0px");
            }
        });
    }

    /* -------------------
     Active menu item on page scroll
     ---------------------*/
    checkActiveSection(cur_pos) {
        let sections = $('section')
            , nav = $('header.navbar .links')
            , nav_height = nav.outerHeight();

        nav.find('a').removeClass('active');
        sections.each(function () {
            let top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();
            if (cur_pos >= top && cur_pos <= bottom) {
                //sections.removeClass('active');
                //$(this).addClass('active');
                nav.find('a[href="/#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    }

    render() {
        return (
            <header className="navbar">
                <div className="logo text-center">
                    <LanguageSwitcher />
                    <Link to="/">
                        <img className="hidden-xs img-responsive" src="./assets/img/logo_150x150.png"
                             alt="Moritz Ellmers"/>
                        <img className="visible-xs-inline-block img-responsive" src="./assets/img/logo_50x50.png"
                             alt="Moritz Ellmers"/>
                    </Link>
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target=".navbar-responsive-collapse">
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                </div>
                <div className="links navbar-collapse collapse navbar-responsive-collapse">
                        <Link to="/">
                            <img className="img-responsive" src="./assets/img/logo_50x50.png" alt="Moritz Ellmers"/>
                        </Link>
                        <ul className="text-center">
                            <li><IndexLink to="/" hash={"#" + this.context.intl.formatMessage({id: "route.skills"})}
                                           onClick={this.scrollToSection.bind(this)}
                                           className="btn btn-default"><FormattedMessage id="components.header.skills"/></IndexLink>
                            </li>
                            <li><IndexLink to="/" hash={"#" + this.context.intl.formatMessage({id: "route.portfolio"})}
                                           onClick={this.scrollToSection.bind(this)}
                                           className="btn btn-default"><FormattedMessage
                                id="components.header.portfolio"/></IndexLink></li>
                            <li><IndexLink to="/" hash={"#" + this.context.intl.formatMessage({id: "route.about"})}
                                           onClick={this.scrollToSection.bind(this)}
                                           className="btn btn-default"><FormattedMessage id="components.header.about"/></IndexLink>
                            </li>
                            <li><IndexLink to="/" hash={"#" + this.context.intl.formatMessage({id: "route.contact"})}
                                           onClick={this.scrollToSection.bind(this)}
                                           className="btn btn-default"><FormattedMessage
                                id="components.header.contact"/></IndexLink></li>
                        </ul>
                </div>
            </header>
        );
    }
}

Header.contextTypes = {
    intl: PropTypes.object.isRequired
};