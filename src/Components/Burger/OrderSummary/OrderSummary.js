import React,{Component} from 'react';

import Aux from '../../../HOC/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('OrderSummary has been up');
    };

    render() {
        const ingrSummary = Object.keys(this.props.ingredients).map(ingrKey=>{
            return <li key={ingrKey}><span style={{textTransform: 'capitalize'}}>{ingrKey}</span>: {this.props.ingredients[ingrKey]}</li>
        });
        return(
            <Aux>
            <h1>Your Order:</h1>
            <p>An amazing Burger with those ingredients:</p>
            <ul>
                {ingrSummary}
            </ul>
            <p><strong>Total: {this.props.price.toFixed(2)}€</strong></p>
            <p>Want to checkout?</p>
            <Button btnType='Danger' clicked={this.props.canceled}>Cancel</Button>
            <Button btnType='Success'clicked={this.props.continued}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;