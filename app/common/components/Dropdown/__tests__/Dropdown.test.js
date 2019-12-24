/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Dropdown from '../index.js';

describe('With Snapshot Testing', () => {
  it('Dropdown component with single list', () => {
    const component = renderer.create(
      <Dropdown
        activeCategory="oseltamivir"
        activeValue="oseltamivir"
        label="Average Supply Levels of"
        onItemClick={() => {}}
        options={[{
          category: {
            name: 'zanamivir',
            title: 'Zanamivir',
          },
        }, {
          category: {
            name: 'oseltamivir',
            title: 'Oseltamivir',
          },
        }, {
          category: {
            name: 'simvastatin',
            title: 'Simvastatin',
          },
        }, {
          category: {
            name: 'all antiviral drugs',
            title: 'All Antiviral Drugs',
          },
        }]}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Dropdown component with placeholder', () => {
    const component = renderer.create(
      <Dropdown
        placeholder="Select Medication"
        activeCategory=""
        activeValue=""
        label="Average Supply Levels of"
        onItemClick={() => {}}
        options={[{
          category: {
            name: 'zanamivir',
            title: 'Zanamivir',
          },
        }, {
          category: {
            name: 'oseltamivir',
            title: 'Oseltamivir',
          },
        }, {
          category: {
            name: 'simvastatin',
            title: 'Simvastatin',
          },
        }, {
          category: {
            name: 'all antiviral drugs',
            title: 'All Antiviral Drugs',
          },
        }]}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Dropdown component with multiple categories', () => {
    const component = renderer.create(
      <Dropdown
        activeCategory="usa"
        activeValue="alaska"
        label="Show in"
        onItemClick={() => {}}
        options={[{
          category: {
            name: 'usa',
            title: 'Uniated States',
          },
          items: [{
            name: 'alabama',
            title: 'Alabama',
          }, {
            name: 'alaska',
            title: 'Alaska',
          }, {
            name: 'arizona',
            title: 'Arizona',
          }, {
            name: 'arkansas',
            title: 'Arkansas',
          }, {
            name: 'california',
            title: 'California',
          }, {
            name: 'colorado',
            title: 'Colorado',
          }, {
            name: 'connecticut',
            title: 'Connecticut',
          }, {
            name: 'delaware',
            title: 'Delaware',
          }, {
            name: 'florida',
            title: 'Florida',
          }, {
            name: 'georgia',
            title: 'Georgia',
          }, {
            name: 'hawaii',
            title: 'Hawaii',
          }, {
            name: 'idaho',
            title: 'Idaho',
          }, {
            name: 'illinois',
            title: 'Illinois',
          }, {
            name: 'indiana',
            title: 'Indiana',
          }, {
            name: 'iowa',
            title: 'Iowa',
          }, {
            name: 'kansas',
            title: 'Kansas',
          }, {
            name: 'kentucky',
            title: 'Kentucky',
          }, {
            name: 'louisiana',
            title: 'Louisiana',
          }, {
            name: 'maine',
            title: 'Maine',
          }, {
            name: 'maryland',
            title: 'Maryland',
          }, {
            name: 'massachusetts',
            title: 'Massachusetts',
          }, {
            name: 'michigan',
            title: 'Michigan',
          }, {
            name: 'minnesota',
            title: 'Minnesota',
          }, {
            name: 'mississippi',
            title: 'Mississippi',
          }, {
            name: 'missouri',
            title: 'Missouri',
          }, {
            name: 'montana',
            title: 'Montana',
          }, {
            name: 'nebraska',
            title: 'Nebraska',
          }, {
            name: 'nevada',
            title: 'Nevada',
          }, {
            name: 'new hampshire',
            title: 'New Hampshire',
          }, {
            name: 'new jersey',
            title: 'New Jersey',
          }, {
            name: 'new mexico',
            title: 'New Mexico',
          }, {
            name: 'new york',
            title: 'New York',
          }, {
            name: 'north carolina',
            title: 'North Carolina',
          }, {
            name: 'north dakota',
            title: 'North Dakota',
          }, {
            name: 'ohio',
            title: 'Ohio',
          }, {
            name: 'oklahoma',
            title: 'Oklahoma',
          }, {
            name: 'oregon',
            title: 'Oregon',
          }, {
            name: 'pennsylvania',
            title: 'Pennsylvania',
          }, {
            name: 'rhode island',
            title: 'Rhode Island',
          }, {
            name: 'south carolina',
            title: 'South Carolina',
          }, {
            name: 'south dakota',
            title: 'South Dakota',
          }, {
            name: 'tennessee',
            title: 'Tennessee',
          }, {
            name: 'texas',
            title: 'Texas',
          }, {
            name: 'utah',
            title: 'Utah',
          }, {
            name: 'vermont',
            title: 'Vermont',
          }, {
            name: 'virginia',
            title: 'Virginia',
          }, {
            name: 'washington',
            title: 'Washington',
          }, {
            name: 'washington dc',
            title: 'Washington DC',
          }, {
            name: 'west virginia',
            title: 'West Virginia',
          }, {
            name: 'wisconsin',
            title: 'Wisconsin',
          }, {
            name: 'wyoming',
            title: 'Wyoming',
          }],
        }]}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
