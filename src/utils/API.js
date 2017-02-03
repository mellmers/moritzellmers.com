import request from 'superagent';
import when from 'when';
import NProgress from 'nprogress';

const baseUrl = "http://localhost/api.moritzellmers";

// Deployment
//const baseUrl = "http://moritzellmers.com/api";

NProgress.configure({ showSpinner: false, trickleRate: 0.05 });

export default class API {
    static getInstance() {
        if(!this['singleton']) {
            this['singleton'] = new API();
        }
        return this['singleton'];
    }

    get(url, params = {}) {
        return this._call(url, 'GET', null, params);
    }

    post(url, data) {
        return this._call(url, 'POST', data, null, "application/x-www-form-urlencoded");
    }

    login(data) {
        return this._call('/user/login', 'POST', data);
    }

    logout() {
        return this._call('/user/logout', 'GET');
    }

    _call(url, method, data = {}, params = {}, contentType = 'application/json') {
        let dfr = when.defer();

        NProgress.start();

        let req = request[method.toLowerCase()](baseUrl + url)
            .set('Accept', 'application/json')
            .set('Content-Type', contentType)
            .query(params);
        switch(method.toLowerCase()) {
            case 'get':
                break;
            case 'delete':
            case 'post':
            case 'patch':
                req = req.send(data);
                break;
            default:
                break;
        }
        let self = this;
        req.end(function(err, res) {
            NProgress.done();

            //console.log(err, res);

            if(res.body !== null && ('errors' in res.body || 'error' in res.body)) {
                self._handleError(res.body);
                dfr.reject(res.body);
            } else {
                dfr.resolve(res.body);
            }
        });
        return dfr.promise;
    }

    _handleError(err) {
        console.error(err);
    }
}