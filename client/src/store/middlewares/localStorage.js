import {AUTH_ACTIONS, LOGOUT, LOGIN} from "../../actions/types";
import Storage from "../../utilities/Storage";

const localStorageMiddleware = store => next => action => {
    if(AUTH_ACTIONS.includes(action.type)) {
        handleStorageChange(action);
    }

    next(action);
};


function handleStorageChange(action) {
    if(action.type === LOGIN) {
        Storage.set("auth", action.payload);
    }

    if(action.type === LOGOUT) {
        Storage.remove("auth");
    }
}

export default localStorageMiddleware;