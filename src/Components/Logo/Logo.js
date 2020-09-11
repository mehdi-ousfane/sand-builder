import React from 'react';

import burgerLogo from '../../Assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="MiamMiam!"/>
    </div>
);

export default Logo;