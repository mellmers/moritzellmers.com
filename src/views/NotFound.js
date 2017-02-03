import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

export default class NotFound extends Component {

    render () {
        return (
            <div id="not-found" className="page container text-center">
                <h1 style={{textAlign: 'center', marginTop: '50px', fontSize: '500%'}}><strong>404</strong></h1>
                <h3>Ooops, diese Seite konnte nicht gefunden werden!</h3>
                <button className="btn btn-primary" style={{marginTop: '30px'}} onClick={() => {browserHistory.goBack();}}>Zurück zur letzten Seite</button>
            </div>
        );
    }
}