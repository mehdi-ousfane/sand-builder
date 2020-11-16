import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;
    let wrapperA;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
        wrapperA = shallow(<NavigationItems isAuthenticated />);
    });
    it('should render 2 elements if you are not auth but 3 otherwise', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
        expect(wrapperA.find(NavigationItem)).toHaveLength(3);
    });
});