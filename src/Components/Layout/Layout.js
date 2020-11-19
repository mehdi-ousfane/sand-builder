import React, {useState} from 'react';
import {connect} from 'react-redux';

import classes from './Layout.module.css';
import Aux from '../../HOC/Aux';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawer, setSideDrawer] = useState(false);
    
    const closeSidedrawer = () => {
        setSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawer(!sideDrawer);
    };
    
        return (
            <Aux >
                    <Toolbar 
                    isAuth = {props.isAuth}
                    clickDrawerToggle={sideDrawerToggleHandler} />
                    <SideDrawer 
                    isAuth = {props.isAuth}
                    open={sideDrawer} 
                    close={closeSidedrawer} />
                    <main className={classes.Content}>
                        {props.children}
                    </main>
            </Aux>
        )
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);