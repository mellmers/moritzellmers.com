import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import ConnectedIntlProvider from './i18n/ConnectedIntlProvider';

import { Router, Route, IndexRoute, browserHistory} from 'react-router';

import * as views from './views/index';
import * as i18n from './i18n/index';

const {
    Admin,
    Application,
    Imprint,
    Home,
    NotFound,
} = views;

let routes = [];
store.getState().application.locales.forEach(function (locale) {
    routes.push(<Route key={locale} path={i18n[locale]['route.imprint']} component={ Imprint } />);
});

function onRouterUpdate() {
    if(window.location.hash === "") {
        window.scrollTo(0, 0);
    }
}

render((
    <Provider store={store}>
        <ConnectedIntlProvider>
            <Router history={browserHistory} onUpdate={onRouterUpdate}>
                <Route path="/" component={Application}>
                    <IndexRoute component={Home}/>
                    {routes}
                    <Route path="admin" component={ Admin }/>
                    <Route path="*" component={ NotFound }/>
                </Route>
            </Router>
        </ConnectedIntlProvider>
    </Provider>
), document.getElementById('app'));