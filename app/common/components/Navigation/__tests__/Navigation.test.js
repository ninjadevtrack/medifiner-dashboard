/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Navigation from '../index.js';

describe('With Snapshot Testing', () => {
  it('Navigation component', () => {
    const component = renderer.create(
      <Navigation
        items={[{
          href: '/components',
          text: 'Map View',
        }, {
          href: '/historic-view',
          text: 'Historic View',
        }, {
          href: '/find-antiviral',
          text: 'Find an Antiviral',
        }]}
        router={{ pathname: '/components' }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
