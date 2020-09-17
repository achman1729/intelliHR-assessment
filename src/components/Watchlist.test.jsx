import React from 'react';
import { mount } from 'enzyme';

import Watchlist from './Watchlist';

describe('<Watchlist/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Watchlist />
    );
  });

  it('should render properly', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toHaveLength(1);
  });
})
