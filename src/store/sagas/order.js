import {put} from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const res = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
    } catch (e) {
            yield put(actions.purchaseBurgerFail(e));
    };
};

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
    const res = yield axios.get('/orders.json' + queryParams);
    const fetchedOrders = [];
    for (let key in res.data) {
        yield fetchedOrders.push({
            ...res.data[key],
            id: key
        });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
        } catch(e) {
    yield put(actions.fetchOrdersFail(e));    
                    }
    };
