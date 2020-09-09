import React from 'react';

import burgerLogo from '../../Assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MiamMiam!"/>
    </div>
);

export default Logo;