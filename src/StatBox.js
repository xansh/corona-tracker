import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import './App.css';

class StatBox extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    newValue: PropTypes.number
  };
  prettify = (name) => (name.split('_').join(' '));
  render()
  {
    return (<div className="StatBox">
      <br/>
      <div className="StatBox-title">{this.prettify(this.props.title)}</div>
      <br/>
      <div>
        <CountUp className="StatBox-data" end={this.props.value} duration={1.5} separator=','/>
        {this.props.newValue ?
          <CountUp className="StatBox-new-data" prefix=' +' end={this.props.newValue} duration={1.5} separator=','/>
          :null
        }
      </div>
    </div>);
  }
}
export default StatBox;
