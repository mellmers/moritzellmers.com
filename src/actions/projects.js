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

export function deleteProject(data) {
    return dispatch => {
        API.getInstance().del('/remove_project.php', data)
            .then(function(response) {

                store.dispatch({
                    type: ActionTypes.DELETE_PROJECT
                });

                return response;
            });
    }
}