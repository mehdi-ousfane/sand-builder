import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredient={()=>{}} />);
    });
    it('should render buildcontrols when receiving ingr', () => {
        wrapper.setProps({ingr: {salad: 0, cheese: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});