/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Input from '../Input.js';

describe('With Snapshot Testing', () => {
  it('Redux input component', () => {
    const mockStore = configureStore([]);
    const store = mockStore();

    const component = renderer.create(
      <Provider store={store}>
        <Input
          label="Label"
          placeholder="Enter Zip Code"
          input={{ name: 'test' }}
          meta={{ touched: false }}
        />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Redux input component with value', () => {
    const mockStore = configureStore([]);
    const store = mockStore();

    const component = renderer.create(
      <Provider store={store}>
        <Input
          label="Label"
          placeholder="Enter Zip Code"
          input={{
            name: 'test',
            value: 'test value',
          }}
          meta={{ touched: true }}
        />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Redux input component with value and error', () => {
    const mockStore = configureStore([]);
    const store = mockStore();

    const component = renderer.create(
      <Provider store={store}>
        <Input
          label="Label"
          placeholder="Enter Zip Code"
          input={{
            name: 'test',
            value: 'test value',
          }}
          meta={{
            touched: true,
            error: 'Test error',
          }}
        />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
