import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../HOC/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as burgerActions from '../../store/actions/index';
import axios from '../../axios-orders';



class BurgerBuilder extends Component {
    //constructor() {

    

    state = {
        purchasing: false,
    }
    componentDidMount() {
        this.props.onInitIngredient();
    }
    upPurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingrKey=>{
            return ingredients[ingrKey];
        }).reduce((sum,el)=>{
            return sum + el;
        },0);
        return sum>0 ;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
        this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('checkout');
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    continueCheckout = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

  /*   addIngredient = (type) => {
        const oldCount = this.props.ingr[type];
        const upCount = oldCount + 1;
        const upIngredients = {
            ...this.props.ingr
        };
        upIngredients[type] = upCount;
        const priceAdd = INGRE_PRICES[type];
        const oldTotalPrice = this.props.price;
        const newTotalPrice = oldTotalPrice + priceAdd;
        this.setState({totalPrice: newTotalPrice, ingredients: upIngredients});
        this.upPurchaseState(upIngredients);
    } */

   /*  removeIngredient = (type) => {
        const oldCount = this.props.ingr[type];
        if (oldCount <= 0) {
            return;
        }
        const upCount = oldCount - 1;
        const upIngredients = {
            ...this.props.ingr
        };
        upIngredients[type] = upCount;
        const priceDed = INGRE_PRICES[type];
        const oldTotalPrice = this.props.price;
        const newTotalPrice = oldTotalPrice - priceDed;
        this.setState({totalPrice: newTotalPrice, ingredients: upIngredients});
        this.upPurchaseState(upIngredients);
    } */

    render() {
        const disabledInfo = {
            ...this.props.ingr
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner/>;

        if(this.props.ingr) {
            burger = 
                (<Aux>
                <Burger ingredients={this.props.ingr} />
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.upPurchaseState(this.props.ingr)}
                    isAuth={this.props.isAuthenticated}
                    ordered={this.purchaseHandler}
                    />
                </Aux>);
            orderSummary = 
                (<OrderSummary 
                ingredients={this.props.ingr}
                price={this.props.price}
                canceled={this.purchaseCancelHandler}
                continued={this.continueCheckout} />);
            
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

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch(burgerActions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(burgerActions.removeIngredient(igName)),
        onInitIngredient: () => dispatch(burgerActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));