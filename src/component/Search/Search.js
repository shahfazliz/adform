import BootstrapForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import PropTypes from 'prop-types';
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  handleOnChangeSearchName = event => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  handleOnKeyEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this
        .props
        .onSearchCampaign(this.state.searchValue);
    }
  }

  render() {
    return <BootstrapForm inline>
      <FormControl
        className='mr-sm-2'
        onChange={ this.handleOnChangeSearchName }
        onKeyDown={ this.handleOnKeyEnter }
        placeholder='Search'
        type='text'
      />
      <Button
        onClick={ this
          .props
          .onSearchCampaign
          .bind(this, this.state.searchValue) }
        variant='outline-success'>Search</Button>
    </BootstrapForm>;
  }
}

Search.propTypes = {
  onSearchCampaign: PropTypes.func,
};

export default Search;