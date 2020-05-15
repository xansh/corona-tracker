import React from 'react';
import logo from './logo.svg';
import './App.css';

const virusData = {
  India: {
    infected: 82000,
    deaths: 100,
    recovered: 40000
  },
  China: {
    infected: 270000,
    deaths: 20000,
    recovered: 100000
  },
  Russia: {
    infected: 90000,
    deaths: 6000,
    recovered: 50000
  },
  Japan: {
    infected: 75000,
    deaths: 6700,
    recovered: 38000
  },
  Pakistan: {
    infected: 1,
    deaths: 0,
    recovered: 0
  }
}


class App extends React.Component {
  state = {country: 'India'};
  stats = (event) => {
     this.setState({country: event.target.value});
  }
  render() {
    const {country} = this.state;
    return (
      <div className="App">
        <label>Countries</label>
        <br/>
        <select onChange = {this.stats} value={country}>
          {Object.keys(virusData).map((element) => (<option key={element} value={element}>{element}</option>))}
        </select>
        <div>Infected = {virusData[country].infected}</div>
        <br/>
        <div>Deaths = {virusData[country].deaths}</div>
        <br/>
        <div>Recovered = {virusData[country].recovered}</div>
      </div>
    );
  }
}

export default App;
