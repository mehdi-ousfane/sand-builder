import {put} from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
    try {
    const res = yield axios.get('https://sand-builder.firebaseio.com/ingredients.json');
    yield put(actions.setIngredients(res.data));
    } catch (error) {}
};