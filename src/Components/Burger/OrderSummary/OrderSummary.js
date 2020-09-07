import React from 'react';

import Aux from '../../../HOC/Aux';

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
            <p>Want to checkout?</p>
        </Aux>
    )
}

export default orderSummary;