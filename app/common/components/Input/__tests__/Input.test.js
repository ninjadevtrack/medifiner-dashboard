/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Input from '../index.js';

describe('With Snapshot Testing', () => {
  it('Input component', () => {
    const component = renderer.create(
      <Input
        label="Label"
        placeholder="Enter Zip Code"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Input component with custom class', () => {
    const component = renderer.create(
      <Input
        label="Label"
        placeholder="Enter Zip Code"
        className="test-input"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Input component with custom input class', () => {
    const component = renderer.create(
      <Input
        label="Label"
        placeholder="Enter Zip Code"
        inputClassName="test-input-field"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
