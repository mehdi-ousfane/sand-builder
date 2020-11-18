import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (e) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: e
    };
};

export const logOut = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const checkAuthTimeout = (expTime) => {
    return {
        type: actionTypes.CHECK_AUTH_TIMEOUT,
        expTime: expTime
    };
}
export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_SIGN,
        email: email,
        password: password,
        isSignUp: isSignUp
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const checkAuthState = () => {
    return {
        type: actionTypes.CHECK_AUTH_STATE
    }
};