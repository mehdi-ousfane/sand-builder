import React, {Component} from 'react';

import Aux from '../../HOC/Aux';
import Burger from '../../Components/Burger/Burger';

class BurgerBuilder extends Component {
    constructor() {

    }

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    }

    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
            </Aux>
        );
    }
}

export default BurgerBuilder;