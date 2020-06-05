import { LOGOUT, LOGIN } from "../actions/types";
import Storage from "../utilities/Storage";

const INITIAL_STATE = Storage.get("auth");

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
