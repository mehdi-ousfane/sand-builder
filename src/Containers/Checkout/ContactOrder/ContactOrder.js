import React, {Component} from 'react';

import Button from '../../../Components/UI/Button/Button';
import classes from './ContactOrder.module.css';

class ContactOrder extends Component {
    state= {
        name: '',
        email: '',
        adress: ''
    }

    render() {
        
        return(
            <div className={classes.ContactOrder}>
                <h4>Please enter your Contact information here:</h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
                    <input className={classes.Input} type='text' name='email' placeholder='Your Email' />
                    <input className={classes.Input} type='text' name='adress' placeholder='Your Adress' />
                    <Button btnType='Success'>Confirm the order</Button>
                </form>
            </div>
        )
    }
}

export default ContactOrder;