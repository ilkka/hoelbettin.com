import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Lander from '../pages/lander.js';

describe('With Enzyme', () => {
  it.skip('Lander has hero image', () => {
    // TODO: does not work yet lol don't know why
    const lander = shallow(<Lander />);

    expect(lander.find('img').to.have.length(1));
  });
});

describe('With Snapshot Testing', () => {
  it('Lander has hero image', () => {
    const component = renderer.create(<Lander />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

