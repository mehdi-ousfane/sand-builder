import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import ContactOrder from '../Checkout/ContactOrder/ContactOrder';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = props => {
    
    const checkoutCancelHandler = () => {
        props.history.goBack();
    }
    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-info');
    }

    let summary = <Redirect to= '/'/>;

    if (props.ingr) {
        const purchaseRedirect = props.purchased ? <Redirect to='/' /> : null;
        summary =  
            <div>
                 {purchaseRedirect}
                <CheckoutSummary ingredients={props.ingr}
                checkoutCancel={checkoutCancelHandler}
                checkoutContinue={checkoutContinueHandler} />
                <Route 
                path={props.match.path + '/contact-info'}
                component={ContactOrder} />
            </div>
    };
        return summary;
};

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};



export default connect(mapStateToProps)(Checkout);