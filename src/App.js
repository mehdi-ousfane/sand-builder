import React, { useEffect } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';
import LogOut from './Containers/Auth/LogOut/LogOut';
import * as actions from './store/actions/index';

const App = props => {
    const {onCheckAuthState} = props;

    useEffect(() => {
        onCheckAuthState();
    }, [onCheckAuthState]);

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to='/'/>
      </Switch>
    );
  
    if (props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={LogOut} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={BurgerBuilder} />
            <Redirect to='/'/>
          </Switch>
      );
    }
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
