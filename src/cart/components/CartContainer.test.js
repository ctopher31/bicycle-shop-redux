import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import CartContainer from './CartContainer';
import Cart from './Cart';
import cartReducer from '../reducers';

describe('CartContainer', () => {
  it('should render the container component', () => {
    const subtotal = 32.95;
    const shipping = 15;
    const store = createStore(cartReducer, {
      cart: [
        {
          number: '51001',
          name: 'widget',
          price: 35.57,
          salePrice: 32.95,
          onSale: true,
        },
      ],
      cartCount: 1,
      subtotal,
      total: subtotal > 0 ? subtotal + shipping : 0,
      shipping: subtotal > 0 ? shipping : 0,
      removeItem: () => 1,
    });

    const wrapper = mount(
      <Provider store={store}>
        <CartContainer />
      </Provider>
    );

    expect(wrapper.find(CartContainer).length).toEqual(1);
    const container = wrapper.find(CartContainer);
    expect(container.find(Cart).length).toEqual(1);
    expect(store.getState().content).toMatchSnapshot();
  });
});
