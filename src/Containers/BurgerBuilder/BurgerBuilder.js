import React, {Component} from 'react';

import Aux from '../../HOC/Aux';
import Burger from '../../Components/Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return(
            <Aux>
                <Burger />
            </Aux>
        );
    }
}

export default BurgerBuilder;