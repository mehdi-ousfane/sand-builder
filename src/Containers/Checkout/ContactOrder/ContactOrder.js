import React, {Component} from 'react';

import Button from '../../../Components/UI/Button/Button';
import classes from './ContactOrder.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactOrder extends Component {
    state= {
        name: '',
        email: '',
        adress: '',
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            price: this.props.price,
            ingredients: this.props.ingredients,
            customer: {
                name: 'boulbou',
                adress: 'chinatown',
                country: 'france',
                email: 'boul@boul.com'
            },
            delivery: 'pigeon voyageur'
        }
        axios.post('/orders.json', order).then(
            res => {this.setState({loading: false});
                    this.props.history.push('/')}
        ).catch(
            e => {this.setState({loading: false});}
        );
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
                <input className={classes.Input} type='text' name='email' placeholder='Your Email' />
                <input className={classes.Input} type='text' name='adress' placeholder='Your Adress' />
                <Button btnType='Success' clicked={this.orderHandler}>Confirm the order</Button>
            </form>);
        if(this.state.loading) {
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactOrder}>
                <h4>Please enter your Contact information here:</h4>
                {form}
            </div>
        )
    }
}

export default ContactOrder;