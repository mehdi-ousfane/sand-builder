import {put, delay} from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirDate');
    yield localStorage.removeItem('userId');
    yield put({        
        type: actionTypes.AUTH_LOGOUT
    });
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expTime * 1000);
    yield put({        
        type: actionTypes.AUTH_LOGOUT
    });
};

export function* authUserSaga(action) {
    yield put({
        type: actionTypes.AUTH_START
    });
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAE9BKPZggTKoiOVfEHe59bg8Oz-4lpU9w';
    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAE9BKPZggTKoiOVfEHe59bg8Oz-4lpU9w';
    }
    try {
    const res = yield axios.post(url, authData);
    const expirDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirDate', expirDate);
    yield localStorage.setItem('userId', res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
    } catch (error) {
    yield put(actions.authFail(error.response.data.error));
    }

};

export function* checkAuthStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logOut());
    } else {
        const expirDate = yield new Date(localStorage.getItem('expirDate'));
        if (expirDate > new Date()) {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirDate.getTime() - new Date().getTime())/1000)); 
        } else {
            yield put(actions.logOut());
        }
    }
};