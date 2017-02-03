import API from './../utils/API';
import * as ActionTypes from '../constants/DataActionTypes';
import store from './../store';

export function getProjects() {
    return API.getInstance().get('/get_all_projects.php')
        .then(function(response) {

            store.dispatch({
                type: ActionTypes.GET_PROJECTS,
                projects: response
            });

            return response;
        });
}

export function createProject(data) {
    return dispatch => API.getInstance().post('/create_project.php', data)
            .then(function(response) {

                store.dispatch({
                    type: ActionTypes.CREATE_PROJECT,
                    project: response
                });

                return response;
            });
}

export function deleteProject(data) {
    return dispatch => API.getInstance().post('/remove_project.php', data)
        .then(function(response) {

            store.dispatch({
                type: ActionTypes.DELETE_PROJECT
            });

            return response;
        });
}

export function updateProject(data) {
    return dispatch => API.getInstance().post('/update_project.php', data)
        .then(function(response) {

            store.dispatch({
                type: ActionTypes.UPDATE_PROJECT,
                project: response
            });

            return response;
        });
}