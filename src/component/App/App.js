import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import DateMoment from '../../utils/dateMoment';
import DatePicker from '../DatePicker/DatePicker';
import Search from '../Search/Search';
import Table from '../Table/Table';

import './App.css';

function App(props) {
  window.AddCampaigns = props.handleAddCampaigns;

  const tableHeader = [{
    key: 'name',
    name: 'Name',
  }, {
    key: 'startDate',
    name: 'Start Date',
  }, {
    key: 'endDate',
    name: 'End Date',
  }, {
    key: 'active',
    name: 'Active',
  }, {
    key: 'Budget',
    name: 'Budget',
  }];

  const today = new DateMoment();

  return (
    <div className='App'>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
        <DatePicker
          default={ today.toString('YYYY-MM-DD') }
          label='Start date'
          onChange={ props.handleChangeStartDate } />

        <DatePicker
          default={ today.toString('YYYY-MM-DD') }
          label='End date'
          onChange={ props.handleChangeEndDate } />

        <Search onSearchCampaign={ props.handleSearchCampaign }/>
      </div>

      <Table
        header={ tableHeader }
        items={ props.campaigns }
      />
    </div>
  );
}

App.propTypes = {
  campaigns: PropTypes.array,
  handleAddCampaigns: PropTypes
    .func
    .isRequired,
  handleChangeEndDate: PropTypes
    .func
    .isRequired,
  handleChangeStartDate: PropTypes
    .func
    .isRequired,
  handleSearchCampaign: PropTypes
    .func
    .isRequired,
};

const mapStateToProps = state => ({
  campaigns: state.campaigns,
});

const mapDispatchToProps = dispatch => ({
  handleAddCampaigns: campaigns => dispatch({
    type: 'ADD_CAMPAIGNS',
    value: campaigns,
  }),
  handleChangeEndDate: endDate => dispatch({
    type: 'FILTER_END_DATE_CAMPAIGNS',
    value: endDate,
  }),
  handleChangeStartDate: startDate => dispatch({
    type: 'FILTER_START_DATE_CAMPAIGNS',
    value: startDate,
  }),
  handleSearchCampaign: campaignName => dispatch({
    type: 'SEARCH_CAMPAIGNS',
    value: campaignName,
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
