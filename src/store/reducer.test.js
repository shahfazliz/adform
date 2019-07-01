import React from 'react';
import reducer from './reducer';

it('should have new state with active value when action.type ADD_CAMPAIGNS', () => {
  let newState = reducer({
    campaigns: [],
  }, {
    type: 'ADD_CAMPAIGNS',
    value: [{
      endDate: '3/9/2018',
      name: 'Inactive Campaign',
      startDate: '9/19/2017',
    }, {
      endDate: '3/9/3030',
      name: 'Active Campaign',
      startDate: '9/19/1990',
    }],
  });

  expect(newState.campaigns[0].active).toEqual(<div>
    <span style={{
      backgroundColor: 'red',
      borderRadius: '50%',
      display: 'inline-block',
      height: '13px',
      marginRight: '5px',
      width: '13px',
    }} />
    <span>Inactive</span>
  </div>);

  expect(newState.campaigns[1].active).toEqual(<div>
    <span style={{
      backgroundColor: 'green',
      borderRadius: '50%',
      display: 'inline-block',
      height: '13px',
      marginRight: '5px',
      width: '13px',
    }} />
    <span>Active</span>
  </div>);
});

it('should have the right Budget value when action.type ADD_CAMPAIGNS', () => {
  let newState = reducer({
    campaigns: [],
  }, {
    type: 'ADD_CAMPAIGNS',
    value: [{
      Budget: 123,
    }, {
      Budget: 1234,
    }, {
      Budget: 12345,
    }, {
      Budget: 123456,
    }, {
      Budget: 1234567,
    }, {
      Budget: 12345678,
    }],
  });

  expect(newState.campaigns[0].Budget).toEqual('123 USD');
  expect(newState.campaigns[1].Budget).toEqual('1k USD');
  expect(newState.campaigns[2].Budget).toEqual('12k USD');
  expect(newState.campaigns[3].Budget).toEqual('123k USD');
  expect(newState.campaigns[4].Budget).toEqual('1.2M USD');
  expect(newState.campaigns[5].Budget).toEqual('12.3M USD');
});