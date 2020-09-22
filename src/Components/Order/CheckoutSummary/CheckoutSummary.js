import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
        <h1>It's gonna be reaaaal good!</h1>
        <div style={{width: '100%',margin: 'auto' }}>
        <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnType='Danger'>Cancel</Button>
        <Button btnType='Success'>Continue</Button>
        </div>
    );
}

export default checkoutSummary;