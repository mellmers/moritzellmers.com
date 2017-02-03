import * as ActionTypes from '../constants/DataActionTypes';
import _ from 'lodash';

let initialState = {
    isLoading: false,
    errors: null,
    entities: {},
    lists: {}
};

export default function(initState = initialState, action) {

    let state = Object.assign({}, initState);

    switch(action.type) {

        case ActionTypes.CREATE_PROJECT:
            if(action.project.id) {
                state.lists.projects.push(action.project);
            }
            return state;

        case ActionTypes.DELETE_PROJECT:
            return state;

        case ActionTypes.GET_PROJECTS:
            state.lists.projects = action.projects;
            return state;

        case ActionTypes.UPDATE_PROJECT:
            let index = _.findIndex(state.lists.projects, {id: action.project.id});
            _.merge(state.lists.projects[index], action.project);
            return state;

        default:
            return state;

    }
}
