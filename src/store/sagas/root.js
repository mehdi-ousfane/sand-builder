import {takeEvery, all} from 'redux-saga/effects';

import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, checkAuthStateSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watch() {
   yield all([
     takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
     takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
     takeEvery(actionTypes.AUTH_SIGN, authUserSaga),
     takeEvery(actionTypes.CHECK_AUTH_STATE, checkAuthStateSaga),
     takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga),
     takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
     takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
   ])
}