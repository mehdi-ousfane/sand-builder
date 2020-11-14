import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../../store/actions/index';

class LogOut extends Component {
    componentDidMount() {
        this.props.onLogOut();
    }
    render() {
        return <Redirect to="/" />;
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actions.logOut())
    };
};

export default connect(null,mapDispatchToProps)(LogOut);