import React, { Component, PropTypes } from 'react';

export default class Base extends Component {

    /* -------------------
     Smooth scrolling to anchor
     ---------------------*/
    scrollToSection(event) {
        let $anchor = $(event.target);
        if (typeof $anchor.attr('href') === "undefined") {
            $anchor = $(event.target).parent("a");
        }
        let id = $anchor.attr('href').split("/")[1];
        $('html, body').stop().animate({
            scrollTop: $(id).offset().top - 80
        }, 1000);
        event.preventDefault();
    }

    renderLoadingSpinner() {
        return (
            <div className="loading-spinner-wrapper">
                <span className="loading-spinner">
                    <i className="fa fa-circle-o-notch fa-spin" />
                </span>
            </div>
        );
    }

    renderLoadingAnimation() {
        return (
            <div className="spinner-wrapper">
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        );
    }
}