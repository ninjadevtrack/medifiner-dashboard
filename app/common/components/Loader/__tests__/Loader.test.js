/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Loader from '../index.js';

describe('With Snapshot Testing', () => {
  it('Loader component', () => {
    const component = renderer.create(
      <Loader>
        Loader
      </Loader>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Loader component with custom class', () => {
    const component = renderer.create(
      <Loader className="test-class">
        Loader
      </Loader>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
