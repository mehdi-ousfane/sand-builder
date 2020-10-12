import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case('input'):
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('textArea'):
            inputElement = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (<select className={classes.InputElement} value={props.value} onChange={props.changed}>
            {props.elementConfig.options.map( op => (
                <option key={op.value} value={op.value}>
                    {op.displayValue}
                </option>
            ))}
            </select>);
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    } 

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;