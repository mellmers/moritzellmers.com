import * as ActionTypes from '../constants/DataActionTypes';

let initialState = {
    isLoading: false,
    errors: null,
    entities: {},
    lists: {}
};

export default function(initState = initialState, action) {

    let state = Object.assign({}, initState);

    switch(action.type) {

        case ActionTypes.DELETE_PROJECT:
            return state;

        case ActionTypes.GET_PROJECTS:
            state.lists.projects = action.projects;
            return state;

        default:
            return state;

    }
}
