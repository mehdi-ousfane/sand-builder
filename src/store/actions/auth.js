import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (e) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: e
    };
};

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
            dispatch(authSuccess(res));
        })
        .catch(e =>{ 
            console.log(e);
            dispatch(authFail(e));
            });
    };
};