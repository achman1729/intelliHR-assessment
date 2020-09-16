import React from 'react';
import { mount } from 'enzyme';

import Dashboard from '../pages/Dashboard';

describe('<Dashboard/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Dashboard />
    );
  });

  it('should render properly', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toHaveLength(1);
  });
})
