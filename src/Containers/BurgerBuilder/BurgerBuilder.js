import React, {Component} from 'react';

import Aux from '../../HOC/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

const INGRE_PRICES = {
    salad: 0.5,
    cheese: 1.0,
    meat: 3.5,
    bacon:2.0
};

class BurgerBuilder extends Component {
    //constructor() {

    

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        purchasable: false,
        totalPrice: 3
    }

    upPurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingrKey=>{
            return ingredients[ingrKey];
        }).reduce((sum,el)=>{
            return sum + el;
        },0);
        this.setState({purchasable: sum>0})
    }

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const upCount = oldCount + 1;
        const upIngredients = {
            ...this.state.ingredients
        };
        upIngredients[type] = upCount;
        const priceAdd = INGRE_PRICES[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + priceAdd;
        this.setState({totalPrice: newTotalPrice, ingredients: upIngredients});
        this.upPurchaseState(upIngredients);
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const upCount = oldCount - 1;
        const upIngredients = {
            ...this.state.ingredients
        };
        upIngredients[type] = upCount;
        const priceDed = INGRE_PRICES[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - priceDed;
        this.setState({totalPrice: newTotalPrice, ingredients: upIngredients});
        this.upPurchaseState(upIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;