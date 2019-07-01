import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import Table from './Table';

configure({ adapter: new Adapter() });

it('should render object header and object items in a table, if there is data', () => {
  const tableComponent = shallow(<Table
    header={[{
      key: 'header1',
      name: 'Header One',
    }, {
      key: 'header2',
      name: 'Header Two',
    }, {
      key: 'header3',
      name: 'Header Three',
    }]}

    items={[{
      header1: 'value1a',
      header2: 'value2a',
      header3: 'value3a',
    }, {
      header1: 'value1b',
      header2: 'value2b',
      header3: 'value3b',
    }, {
      header1: 'value1c',
      header2: 'value2c',
      header3: 'value3c',
    }]} />);

  expect(tableComponent.find('thead')).toMatchSnapshot(
    `<thead>
      <tr>
        <th>Header One</th>
        <th>Header Two</th>
        <th>Header Three</th>
      </tr>
    </thead>`);

  expect(tableComponent.find('tbody')).toMatchSnapshot(
    `<tbody>
      <tr>
        <td>value1a</td>
        <td>value2a</td>
        <td>value3a</td>
      </tr>
      <tr>
        <td>value1b</td>
        <td>value2b</td>
        <td>value3b</td>
      </tr>
      <tr>
        <td>value1c</td>
        <td>value2c</td>
        <td>value3c</td>
      </tr>
    </tbody>`);
});

it('should render object header but no items in a table, when there is no data', () => {
  const tableComponent = shallow(<Table
    header={[{
      key: 'header1',
      name: 'Header One',
    }, {
      key: 'header2',
      name: 'Header Two',
    }, {
      key: 'header3',
      name: 'Header Three',
    }]}

    items={[]} />);

  expect(tableComponent.find('thead')).toMatchSnapshot(
    `<thead>
      <tr>
        <th>Header One</th>
        <th>Header Two</th>
        <th>Header Three</th>
      </tr>
    </thead>`);

  expect(tableComponent.find('tbody')).toMatchSnapshot(
    `<tbody>
      <tr>
        <td col-span>Sorry, no data available</td>
      </tr>
    </tbody>`);
});