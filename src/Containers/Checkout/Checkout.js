import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import ContactOrder from '../Checkout/ContactOrder/ContactOrder';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-info');
    }

    render() {

        let summary = <Redirect to= '/'/>;
    if (this.props.ingr) {
        const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null;
        summary =  
            <div>
                 {purchaseRedirect}
                <CheckoutSummary ingredients={this.props.ingr}
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler} />
                <Route 
                path={this.props.match.path + '/contact-info'}
                component={ContactOrder} />
            </div>
    };
        return summary;
    };
}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};



export default connect(mapStateToProps)(Checkout);