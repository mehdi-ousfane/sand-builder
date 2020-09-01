import React from 'react';

import classes from './Layout.module.css';
import Aux from '../../HOC/Aux';

const layout = (props) => (
    <Aux>
        <div>
            <p>poulpoul</p>
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;