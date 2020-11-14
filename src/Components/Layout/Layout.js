import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Layout.module.css';
import Aux from '../../HOC/Aux';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSidedrawer: false
    }
    closeSidedrawer = () => {
        this.setState({showSidedrawer: false});
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSidedrawer: !prevState.showSidedrawer};
        });
    }

    render() {
        return (
            <Aux >
                    <Toolbar 
                    isAuth = {this.props.isAuth}
                    clickDrawerToggle={this.sideDrawerToggleHandler} />
                    <SideDrawer 
                    isAuth = {this.props.isAuth}
                    open={this.state.showSidedrawer} 
                    close={this.closeSidedrawer} />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);