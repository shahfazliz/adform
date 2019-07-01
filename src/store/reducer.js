import React from 'react';
import DateMoment from '../utils/dateMoment';

/**
 * The green icon for active state
 */
const greenDot = {
  backgroundColor: 'green',
  borderRadius: '50%',
  display: 'inline-block',
  height: '13px',
  marginRight: '5px',
  width: '13px',
};

/**
 * The red icon for inactive state
 */
const redDot = {
  ...greenDot,
  backgroundColor: 'red',
};

/**
 * A function to calculate and return 'active' component with green circle icon if the current
 * system date is within the range of startDate and endDate. Otherwise returns 'inactive' with
 * a red circle icon.
 *
 * @param {String} startDate - String with date format dd/mm/yyyy
 * @param {String} endDate - String with date format dd/mm/yyyy
 *
 * @example
 * createActiveStatus('31/01/1990', '31/12/3030'); // Active
 * createActiveStatus('31/01/1990', '31/12/200'); // Inactive
 *
 * @return {React.Component}
 */
const createActiveStatus = (startDate, endDate) => {
  const now = new Date().getTime();

  const startTime = new Date(startDate).getTime();

  endDate = new Date(endDate);
  endDate.setDate(endDate.getDate() + 1);

  const endTime = endDate.getTime();

  return now >= startTime && now < endTime
    ? <div>
      <span style={ greenDot } />
      <span>Active</span>
    </div>
    : <div>
      <span style={ redDot } />
      <span>Inactive</span>
    </div>;
};

/**
 * A function that will simplify a large number using 'k' for thousands and 'M' for millions
 *
 * @param {Number} bigNumber - The large number to be simplified
 *
 * @example
 * simplifyNumber(123) // 123
 * simplifyNumber(1234) // 1k
 * simplifyNumber(12345) // 12k
 * simplifyNumber(123456) // 123k
 * simplifyNumber(1234567) // 1.2M
 *
 * @returns {String}
 */
const simplifyNumber = bigNumber => {
  let newNumber = Math.floor(bigNumber / 1000);
  if (newNumber <= 0) {
    return bigNumber;
  }

  if (newNumber < 1000) {
    return `${newNumber}k`;
  }

  return `${(newNumber / 1000).toFixed(1)}M`;
};

/**
 * To returns a new array of campaigns but we have to change some of the values like Budget, active
 * state, and dates to be in the right format.
 * @param {Array} campaignsToDisplay -  Campaigns we have filtered or added from all campaigns to be
 *                                      displayed.
 *
 * @returns {Array}
 */
const displayCampaignsArray = campaignsToDisplay => campaignsToDisplay
  .map(campaign => ({
    ...campaign,
    Budget: `${simplifyNumber(campaign.Budget)} USD`,
    active: createActiveStatus(campaign.startDate, campaign.endDate),
    endDate: campaign
      .endDate
      .toString('L'),
    startDate: campaign
      .startDate
      .toString('L'),
  }));

/**
 * The initial state for this Redux's reducer
 */
const initialState = {
  allCampaigns: [],
  campaigns: [],
};

/**
 * Main entry of this Redux's reducer
 *
 * @param {Object} [state={allCampaigns: [], campaigns: []}] -  Optional state to be assigned to
 *                                                              this reducer
 * @param {Object} action - Required object
 * @param {String} action.type - To provide what type of action to do when invoked
 * @param {*} action.value - Any type of data passed the the function when invoking this reducer
 *
 * @returns {Object}
 */
const reducer = (state = initialState, action) => {
  const newState = { ...state };

  if (action.type === 'ADD_CAMPAIGNS') {
    newState.allCampaigns = state
      .allCampaigns
      .concat(action
        .value
        .map(campaign => ({
          ...campaign,
          endDate: new DateMoment(campaign.endDate, 'MM/DD/YYYY'),
          startDate: new DateMoment(campaign.startDate, 'MM/DD/YYYY'),
        })));

    console.log(newState.allCampaigns);

    newState.campaigns = displayCampaignsArray(newState.allCampaigns);
  }

  if (action.type === 'FILTER_END_DATE_CAMPAIGNS') {
    newState.campaigns = displayCampaignsArray(state
      .allCampaigns
      .filter(campaign => action
        .value
        .isSameOrBefore(campaign.endDate)));
  }

  if (action.type === 'FILTER_START_DATE_CAMPAIGNS') {
    newState.campaigns = displayCampaignsArray(state
      .allCampaigns
      .filter(campaign => action
        .value
        .isSameOrAfter(campaign.startDate)));
  }

  if (action.type === 'SEARCH_CAMPAIGNS') {
    newState.campaigns = displayCampaignsArray(state
      .allCampaigns
      .filter(campaign => campaign.name.includes(action.value)));
  }

  return newState;
};

export default reducer;
