import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

const Auth = props => {
    const [controls, setControls] = useState({
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
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        });
        const [isSignUp, setIsSignUp] = useState(true);

    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;
    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath()
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const checkValid = (value, rules) => {
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

    const inputChangedHandler = (event, controlName) => {
        const upControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValid(event.target.value,controls[controlName].validation),
                touched: true
            }
        };
        setControls(upControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp)
    }

    const swithAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    }
    
        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)} />
        ));

        if (props.loading) {
            form = <Spinner />
        }

        let errorMess = null;
        if (props.error) {
            errorMess = (
                <p>{props.error.message}</p>
            );
        }
        let authRedirect = null;
        if (props.isAuthenticated) {
            authRedirect=<Redirect to={props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMess}
                <form onSubmit={submitHandler}>
                    {form}
                <Button btnType='Success'>SUBMIT</Button>
                </form>
        <Button 
        clicked={swithAuthModeHandler}
        btnType='Danger'>{isSignUp ? 'SIGN IN' : 'SIGN UP'} 
        </Button>
            </div>
        );

};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);