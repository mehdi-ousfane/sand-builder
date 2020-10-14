import React, {Component} from 'react';

import Button from '../../../Components/UI/Button/Button';
import classes from './ContactOrder.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactOrder extends Component {
    state= {
    orderForm: {
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            adress: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Adress'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
        },
    formIsValid: false,
    loading: false
    }


    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData= {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const order = {
            price: this.props.price,
            ingredients: this.props.ingredients,
            orderData: formData
                }
        axios.post('/orders.json', order).then(
            res => {this.setState({loading: false});
                    this.props.history.push('/')}
        ).catch(
            e => {this.setState({loading: false});}
        );
    }
    checkValid(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValid(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputId] = updatedFormElement;
        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map( formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                )
                )}
                <Button btnType='Success' disabled={!this.state.formIsValid}>Confirm the order</Button>
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