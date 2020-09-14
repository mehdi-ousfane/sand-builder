import React, {Component} from 'react';

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
            <Aux>
                <Toolbar clickDrawerToggle={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSidedrawer} close={this.closeSidedrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;