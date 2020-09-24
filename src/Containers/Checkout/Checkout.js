import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import ContactOrder from '../Checkout/ContactOrder/ContactOrder';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        price: 0
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for (let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1]
            }
            else { ingredients[param[0]] = +param[1]; }
           
        }
        this.setState({ingredients: ingredients, totalPrice: price});

    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-info');
    }

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler} />
                <Route 
                path={this.props.match.path + '/contact-info'}
                render={(props) => (<ContactOrder ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}  />
            </div>
        );
    };
}

export default Checkout;