import * as actionTypes from './actionTypes';
import axios from 'axios';

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
    localStorage.removeItem('token');
    localStorage.removeItem('expirDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expTime*1000)
    };
}
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAE9BKPZggTKoiOVfEHe59bg8Oz-4lpU9w';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAE9BKPZggTKoiOVfEHe59bg8Oz-4lpU9w';
        }
        axios.post(url, authData)
        .then(res => {
            console.log(res);
            const expirDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirDate', expirDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(e =>{ 
            console.log(e);
            dispatch(authFail(e.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logOut());
        } else {
            const expirDate = new Date(localStorage.getItem('expirDate'));
            if (expirDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirDate.getTime() - new Date().getTime())/1000);
            } else {
                dispatch(logOut());
            }
        }
    }
};