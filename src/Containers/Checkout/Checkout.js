import React, {Component} from 'react';
import {Route} from 'react-router-dom';
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
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ingr}
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler} />
                <Route 
                path={this.props.match.path + '/contact-info'}
                component={ContactOrder} />
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        ingr: state.ingredients,
    };
};

export default connect(mapStateToProps)(Checkout);