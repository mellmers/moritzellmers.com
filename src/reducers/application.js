import * as ApplicationActionTypes from '../constants/ApplicationActionTypes';

const initialState = {
    locale: "",
    locales: ["en", "de"],
    /*user: null,
    loginError: null,
    registerError: null,
    currentRoute: null
    */
};

export default function(initState = initialState, action) {

    let state = Object.assign({}, initState);

    switch(action.type) {

        case ApplicationActionTypes.APPLICATION_LOCALE_SWITCHED:
            state.locale = action.locale;
            return state;

        default:
            return state;

    }
}
