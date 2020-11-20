import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../../store/actions/index';

const LogOut = props => {
    const { onLogOut } = props;

    useEffect(() => {
        onLogOut();
    }, [onLogOut]);

        return <Redirect to="/" />;
    
};

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actions.logOut())
    };
};

export default connect(null,mapDispatchToProps)(LogOut);