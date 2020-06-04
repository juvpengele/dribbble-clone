import { LOGOUT, LOGIN } from "../actions/types";

const INITIAL_STATE = null;

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN:
            return action.payload;
        case LOGOUT:
            return null;
        default:
            return state;
    }
}
