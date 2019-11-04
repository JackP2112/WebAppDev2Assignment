import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      mediaType: 'all',
      mediaStatus: 'in progress'
    }
  }

  handleTextChange = event => {
    this.setState({
      text: event.target.value
    })
  }

  handleTypeChange = event => {
    this.setState({
      mediaType: event.target.value
    })
  }

  handleStatusChange = event => {
    this.setState({
      mediaStatus: event.target.value
    })
  }

  render() {
    return (
      <div className='vh-100 col-2 border pt-3'>
        <input type='text' placeholder='Search...' value={this.state.text} onChange={this.handleTextChange} className='form-control mb-4'/>

        <div className='form-group row'>
          <label className='col-form-label col-sm-3'>Type</label>
          <div className='col-sm-9'>
            <select value={this.state.mediaType} onChange={this.handleTypeChange} className='form-control'>
              <option value='all'>All</option>
              <option value='movies'>Movies</option>
              <option value='series'>Series</option>
              <option value='books'>Books</option>
              <option value='music'>Music</option>
            </select>
          </div>
        </div>

        <fieldset className='form-group'>
          <div className='row'>
            <legend className='col-form-label col-sm-3 pt-0'>Status</legend>
            <div className='col-sm-9'>
              <div className='form-check'>
                <input id='radioQueued' className='form-check-input' type='radio' value='queued' checked={this.state.mediaStatus === 'queued'} onChange={this.handleStatusChange}/>
                <label htmlFor='radioQueued' className='form-check-label'>Queued</label>
              </div>
              <div className='form-check'>
                <input id='radioInProgress' className='form-check-input' type='radio' value='in progress' checked={this.state.mediaStatus === 'in progress'} onChange={this.handleStatusChange}/>
                <label htmlFor='radioInProgress' className='form-check-label'>In progress</label>
              </div>
              <div className='form-check'>
                <input id='radioCompleted' className='form-check-input' type='radio' value='completed' checked={this.state.mediaStatus === 'completed'} onChange={this.handleStatusChange}/>
                <label htmlFor='radioCompleted' className='form-check-label'>Completed</label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default SearchBar;
