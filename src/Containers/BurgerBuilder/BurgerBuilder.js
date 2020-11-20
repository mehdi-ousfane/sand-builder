import React, {useEffect, useState} from 'react';
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



export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    
    const {onInitIngredient} = props;
    useEffect(() => {
        onInitIngredient();
    }, [onInitIngredient]);

   
    const upPurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingrKey=>{
            return ingredients[ingrKey];
        }).reduce((sum,el)=>{
            return sum + el;
        },0);
        return sum>0 ;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
        setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('checkout');
            props.history.push('/auth')
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const continueCheckout = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

  /*   addIngredient = (type) => {
        const oldCount = props.ingr[type];
        const upCount = oldCount + 1;
        const upIngredients = {
            ...props.ingr
        };
        upIngredients[type] = upCount;
        const priceAdd = INGRE_PRICES[type];
        const oldTotalPrice = props.price;
        const newTotalPrice = oldTotalPrice + priceAdd;
        this.setState({totalPrice: newTotalPrice, ingredients: upIngredients});
        this.upPurchaseState(upIngredients);
    } */

   /*  removeIngredient = (type) => {
        const oldCount = props.ingr[type];
        if (oldCount <= 0) {
            return;
        }
        const upCount = oldCount - 1;
        const upIngredients = {
            ...props.ingr
        };
        upIngredients[type] = upCount;
        const priceDed = INGRE_PRICES[type];
        const oldTotalPrice = props.price;
        const newTotalPrice = oldTotalPrice - priceDed;
        this.setState({totalPrice: newTotalPrice, ingredients: upIngredients});
        this.upPurchaseState(upIngredients);
    } */

        const disabledInfo = {
            ...props.ingr
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner/>;

        if(props.ingr) {
            burger = 
                (<Aux>
                <Burger ingredients={props.ingr} />
                <BuildControls 
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={upPurchaseState(props.ingr)}
                    isAuth={props.isAuthenticated}
                    ordered={purchaseHandler}
                    />
                </Aux>);
            orderSummary = 
                (<OrderSummary 
                ingredients={props.ingr}
                price={props.price}
                canceled={purchaseCancelHandler}
                continued={continueCheckout} />);
            
        };

        return(
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    
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