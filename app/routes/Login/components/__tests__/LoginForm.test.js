/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import LoginForm from '../loginForm.js';

describe('With Snapshot Testing', () => {
  it('LoginForm shows fields with button', () => {
    const mockStore = configureStore([]);
    const store = mockStore();

    const component = renderer.create(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
