import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

const Toolbar = () => (
    <header className={classes.Toolbar}>
        <div>menu</div>
        <Logo />
        <nav>
            ...
        </nav>
    </header>
)

export default Toolbar;