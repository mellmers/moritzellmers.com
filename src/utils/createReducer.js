import _ from 'lodash';


export default function createReducer (initialState, actionHandlers) {
    return (state = initialState, action = {type: ""}) => {
        const reduceFn = actionHandlers[action.type];
        if (!reduceFn)
            return state;
        return _.merge({}, reduceFn(state, action));
    }
}