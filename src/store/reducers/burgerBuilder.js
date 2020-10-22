import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 3
};
const INGRE_PRICES = {
    salad: 0.5,
    cheese: 1.0,
    meat: 3.5,
    bacon:2.0
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGRE_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGRE_PRICES[action.ingredientName]
            };
            case actionTypes.SET_INGREDIENTS:
                return {
                    ...state,
                    ingredients: action.ingredients,
                    totalPrice: 3
                };
        default:
            return state;
    }
};

export default reducer;