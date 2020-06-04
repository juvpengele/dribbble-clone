import { LOGOUT, LOGIN } from "./types";

export function login(userAttributes) {
    return {
        type: LOGIN,
        payload: userAttributes
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}