import React from 'react';
import BootstrapTable from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

import '../../css/bootstrap.min.css';

const setHeader = header => header.map((head, index) => <th key={ index }>{ head.name }</th>);

const setValues = (row, header) => header.map((head, index) => <td key={ index }>{ row[head.key] }</td>);

const setRows = (items, header) => items
  .length
  ? items.map((row, index) => <tr key={ index }>{ setValues(row, header) }</tr>)
  : <tr>
    <td colSpan={ header.length }>Sorry, no data available</td>
  </tr>;

/**
 * Using adapter design pattern, we wrap the bootstrap Table component into our own custom table
 * component. This design pattern allows us to change the underlying third party component without
 * changing our code base.
 *
 * @param {Object[]} props.header - An array of object that will be the header of the table. This
 *                                  parameter is required because the sequence of keys in an object
 *                                  is not guaranteed.
 *
 * @param {String} props.header.key - The key of the associated object in props.item
 *
 * @param {String} props.header.name - The name of the header to display
 *
 * @param {Object[]} props.items -  An array of objects that should be the content of the table where
 *                                  the keys are the header of the table and the values are the cell
 *                                  values.
 * @example
 * <Table
 *  header={[{
 *    key: 'header1',
 *    name: 'Header One',
 *  }, {
 *    key: 'header2',
 *    name: 'Header Two',
 *  }, {
 *    key: 'header3',
 *    name: 'Header Three',
 *  }]}
 *
 *  items={[{
 *    header1: 'value1a',
 *    header2: 'value2a',
 *    header3: 'value3a',
 *  }, {
 *    header1: 'value1b',
 *    header2: 'value2b',
 *    header3: 'value3b',
 *  }, {
 *    header1: 'value1c',
 *    header2: 'value2c',
 *    header3: 'value3c',
 * }]} />
 *
 * @returns {React.Component}
 */
function Table(props) {
  return (<BootstrapTable striped bordered hover>
    <thead>
      <tr>{ setHeader(props.header) }</tr>
    </thead>
    <tbody>{ setRows(props.items, props.header) }</tbody>
  </BootstrapTable>);
}

Table.propTypes = {
  header: PropTypes
    .arrayOf(PropTypes.object)
    .isRequired,
  items: PropTypes
    .arrayOf(PropTypes.object)
    .isRequired,
};

export default Table;