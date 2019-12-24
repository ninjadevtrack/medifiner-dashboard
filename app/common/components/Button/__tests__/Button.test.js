/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../index.js';

describe('With Snapshot Testing', () => {
  it('Button component', () => {
    const component = renderer.create(
      <Button>
        Button
      </Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Button component with custom class', () => {
    const component = renderer.create(
      <Button className="test-class">
        Button
      </Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Secondary button component', () => {
    const component = renderer.create(
      <Button secondary>
        Button
      </Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Link as button component', () => {
    const component = renderer.create(
      <Button
        isLink
        href="/"
        as="/"
      >
        Button
      </Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Link as button component with custom class', () => {
    const component = renderer.create(
      <Button
        isLink
        href="/"
        as="/"
        className="test-class"
      >
        Button
      </Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Link as secondary button component', () => {
    const component = renderer.create(
      <Button
        secondary
        isLink
        href="/"
        as="/"
      >
        Button
      </Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Wide button component', () => {
    const component = renderer.create(
      <Button wide>
        Button
      </Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Wide secondary button component', () => {
    const component = renderer.create(
      <Button
        secondary
        wide
      >
        Button
      </Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
