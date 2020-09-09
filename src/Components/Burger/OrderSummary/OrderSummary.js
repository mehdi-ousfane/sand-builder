import React from 'react';

import Aux from '../../../HOC/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingrSummary = Object.keys(props.ingredients).map(ingrKey=>{
        return <li key={ingrKey}><span style={{textTransform: 'capitalize'}}>{ingrKey}</span>: {props.ingredients[ingrKey]}</li>
    });
    return(
        <Aux>
            <h1>Your Order:</h1>
            <p>An amazing Burger with those ingredients:</p>
            <ul>
                {ingrSummary}
            </ul>
            <p><strong>Total: {props.price.toFixed(2)}€</strong></p>
            <p>Want to checkout?</p>
            <Button btnType='Danger' clicked={props.canceled}>Cancel</Button>
            <Button btnType='Success'clicked={props.continued}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;