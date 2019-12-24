/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import FiltersList from '../index.js';

describe('With Snapshot Testing', () => {
  it('Filters list component with flat filters', () => {
    const component = renderer.create(
      <FiltersList
        filters={[{
          checked: true,
          name: 'Oseltamivir75',
          title: 'Oseltamivir 75mg (pill)',
        }, {
          checked: true,
          name: 'Oseltamivir45',
          title: 'Oseltamivir 45mg (pill)',
        }, {
          checked: true,
          name: 'Oseltamivir30',
          title: 'Oseltamivir 30mg (pill)',
        }, {
          checked: true,
          name: 'oseltamivir',
          title: 'Oseltamivir Suspension (liquid)',
        }]}
        onChange={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Filters list component with nested filters', () => {
    const component = renderer.create(
      <FiltersList
        filters={[{
          checked: true,
          count: 528,
          name: 'chain',
          filters: [{
            checked: true,
            count: 120,
            name: 'cvs',
            title: 'CVS',
          }, {
            checked: true,
            count: 245,
            name: 'walmart',
            title: 'Walmart',
          }, {
            checked: true,
            count: 163,
            name: 'walgreens',
            title: 'Walgreens',
          }],
          title: 'Chain',
        }, {
          checked: true,
          count: 201,
          name: 'independent',
          title: 'Independent',
        }, {
          checked: true,
          count: 100,
          name: 'franchise',
          title: 'Franchise',
        }]}
        onChange={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
