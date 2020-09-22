import React, {Component} from 'react';

import Aux from '../../HOC/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

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
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        purchasable: false,
        purchasing: false,
        totalPrice: 3,
        loading: false
    }
    componentDidMount() {
        axios.get('https://sand-builder.firebaseio.com/ingredients.json').then(
            res => {this.setState({ingredients: res.data})}
        ).catch(
            e => {}
        )
    }
    upPurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingrKey=>{
            return ingredients[ingrKey];
        }).reduce((sum,el)=>{
            return sum + el;
        },0);
        this.setState({purchasable: sum>0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    continueCheckout = () => {
        this.setState({loading: true})
        const order = {
            price: this.state.totalPrice,
            ingredients: this.state.ingredients,
            customer: {
                name: 'boulbou',
                adress: 'chinatown',
                country: 'france',
                email: 'boul@boul.com'
            },
            delivery: 'pigeon voyageur'
        }
        axios.post('/orders.json', order).then(
            res=>console.log(this.setState({loading: false, purchasing: false}))
        ).catch(
            e=>console.log(this.setState({loading: false, purchasing: false}))
        );
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

        let orderSummary = null;
        let burger = <Spinner/>;

        if(this.state.ingredients) {
            burger = 
                (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    />
                </Aux>);
            orderSummary = 
                (<OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                canceled={this.purchaseCancelHandler}
                continued={this.continueCheckout} />);
            if(this.state.loading) {
                    orderSummary = <Spinner />;
                }
        };

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);