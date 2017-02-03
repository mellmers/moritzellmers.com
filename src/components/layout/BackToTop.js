import React, { PropTypes } from 'react';
import Base from './../Base';

import './../../stylesheets/components/layout/backToTop.scss';

class BackToTop extends Base {

    componentDidMount() {
        $(window).on("scroll", function () {
            let $backToTop = $("#back-to-top");
            if($(this).scrollTop() > 500) {
                $backToTop.fadeIn();
            } else {
                $backToTop.fadeOut();
            }
        });
    }

    render() {
        return (
            <a href="#"><img id="back-to-top" src="./assets/img/back-to-top.png" onClick={() => $('html, body').animate({ scrollTop: 0}, 1000)} /></a>
        );
    }
}
export default BackToTop;