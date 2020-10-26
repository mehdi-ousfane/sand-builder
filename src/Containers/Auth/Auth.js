import React, {Component} from 'react';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                minLength: 6
            }
        }
    };

    checkValid = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' & isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength & isValid;
        }
        return isValid;
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                <Button btnType='Success'>SUBMIT</Button>
                </form>
            </div>
        );
    };
}

export default Auth;