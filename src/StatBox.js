import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import './App.css';

class StatBox extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  };
  prettify = (name) => (name.split('_').join(' '));
  render()
  {
    return (<div>
      <br/>
      <div className="StatBox-title">{this.prettify(this.props.title)}</div>
      <br/>
      <div className="StatBox-data">
        <CountUp end={this.props.value} duration={1.5} separator=','/>
      </div>
    </div>);
  }
}
export default StatBox;
