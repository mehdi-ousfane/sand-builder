import React from 'react';

import classes from './NavigationItems.module.css'
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger</NavigationItem>
        {props.isAuthenticated
        ? <NavigationItem link='/orders'>Orders</NavigationItem>
        : null }
        {props.isAuthenticated 
        ? <NavigationItem link='/logout'>Log Out</NavigationItem>
        : <NavigationItem link='/auth'>Log In</NavigationItem> }
    </ul>
);

export default navigationItems;