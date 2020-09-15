import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../HOC/Aux';
import BackDrops from '../BackDrop/BackDrops';

const modal = React.memo((props) => (
    <Aux>
        <BackDrops show={props.show} clicked={props.modalClosed} />
    <div className={classes.Modal}
         style={{
             transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
             opacity: props.show ? '1' : '0'
         }}>
        {props.children}
    </div>
    </Aux>
));

export default modal;