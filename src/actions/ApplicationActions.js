import * as types from '../constants/ApplicationActionTypes';

export function localeSwitched(locale) {
    return {
        type: types.APPLICATION_LOCALE_SWITCHED,
        locale: locale
    };
}