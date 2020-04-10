import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css'

import { DateRangePicker } from 'react-dates';

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
    };
  }

  render() {
    const startDate =this.state.startDate===null?null:this.state.startDate.format('YYYY-MM-DD')
    const EndDate =this.state.endDate===null?null:this.state.endDate.format('YYYY-MM-DD')
    console.log(startDate)
    console.log(EndDate)
    return (
      <div className="App">
        <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
  
          onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
        />
      </div>
    );
  }
}
export default Start;