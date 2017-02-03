import React, { Component } from 'react';

import BackToTop from './../components/layout/BackToTop';
import Header from './../components/Header';
import Footer from './../components/Footer';

import './../stylesheets/application.scss';

export default class Application extends Component {

    componentWillMount() {
        String.prototype.capitalize = function(){
            return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
        };
    }

    componentDidMount() {
        $.material.init();
    }

    render() {
        return (
            <div>
                <Header />
                <div className="content">
                    {React.cloneElement(this.props.children, ...this.props)}
                </div>
                <BackToTop />
                <Footer />
            </div>
        );
    }
}