/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import UserAvatar from '../index.js';

describe('With Snapshot Testing', () => {
  it('User avatar component', () => {
    const mockStore = configureStore([]);
    const initialState = {
      auth: {
        me: {
          data: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      },
    };
    const store = mockStore(initialState);

    const component = renderer.create(
      <Provider store={store}>
        <UserAvatar />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
