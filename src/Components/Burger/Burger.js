import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    let transIngredients = Object.keys(props.ingredients).map(ingrKey=>{ 
        return [...Array(props.ingredients[ingrKey])].map((_,i)=>{
            return <BurgerIngredients key={ingrKey+i} type={ingrKey} />
        });
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if (transIngredients.length === 0) {
        transIngredients = <p>Please add some ingredients</p>;
    };
    console.log(transIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
        
    );
};

export default burger;