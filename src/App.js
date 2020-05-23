import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import LineChart, {parseFlatArray} from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';
import './App.css';
import StatBox from './StatBox';

const url = 'https://api.thevirustracker.com/free-api?countryTotals=ALL';
const defaultCountry = 'IN';

class App extends React.Component {
  state = {
    selectedCountry: '',
    allData: {},
    loading: true,
    success: false,
    chartData: [],
    chartLoading: true,
    chartSuccess: false
  };
  async componentDidMount()
  {
    await fetch(url)
    .then(async (response) => {
      const virusData = (await response.json()).countryitems[0];
      let modifiedVirusData = {};
      Object.keys(virusData).forEach((key) => {
        let countryData = virusData[key];
        const code = countryData.code;
        delete countryData.code;
        delete countryData.source;
        delete countryData.ourid;
        modifiedVirusData[code] = countryData;
      });
      this.setState({success: true, allData: modifiedVirusData, selectedCountry: defaultCountry});
    })
    .catch((error) => {
      console.log(error);
      this.setState({success: false});
    });
    this.onSelectCountry(defaultCountry);
    this.setState({loading: false});
  }
  onSelectCountry = (value) => {
     this.setState({selectedCountry: value, chartLoading: true});
     fetch(`https://corona-api.com/countries/${value}`)
     .then(async (response) => {
       const responseData = (await response.json()).data.timeline;
       const chartData = parseFlatArray(responseData,
                                        'date',
                                        ['confirmed', 'active', 'deaths', 'recovered'],
                                        ['black', 'blue', 'red', 'green'],
                                        undefined,
                                        ['Total', 'Active', 'Deaths', 'Recovered']);
       console.log(chartData);
       this.setState({chartSuccess: true, chartData});
     })
     .catch((error) => {
       console.log(error);
       this.setState({chartSuccess: false});
     })
     .finally(() => {
       this.setState({chartLoading: false});
     });
  }
  render() {
    const {
      selectedCountry,
      allData,
      loading, success,
      chartData,
      chartLoading, chartSuccess} = this.state;
    return (
      <div className="App">
        {loading?
          (<h1>Loading...</h1>) :
          (<div>
            {success?
              (<div>
                <div>
                  <h1>Countrywise Corona Tracker</h1>
                  <br/>
                  <h2>Select A Country</h2>
                  <br/>
                  <ReactFlagsSelect
                    searchable
                    onSelect={this.onSelectCountry}
                    countries={Object.keys(allData)}
                    defaultCountry={selectedCountry}
                  />
                  <br/>
                  <StatBox
                    title={'Total Cases'}
                    value={allData[selectedCountry].total_cases}
                    newValue={allData[selectedCountry].total_new_cases_today}
                  />
                  <StatBox
                    title={'Total Active Cases'}
                    value={allData[selectedCountry].total_active_cases}
                  />
                  <StatBox
                    title={'Total Recovered'}
                    value={allData[selectedCountry].total_recovered}
                  />
                  <StatBox
                    title={'Total Deaths'}
                    value={allData[selectedCountry].total_deaths}
                    newValue={allData[selectedCountry].total_new_deaths_today}
                  />
                </div>
                <div>
                  {chartLoading ?
                    <h1>Loading Chart...</h1> :
                    chartSuccess ?
                      <LineChart
                        data={chartData}
                        xLabel='Date'
                        yLabel=''
                        isDate
                        showLegends
                        pointRadius={2}
                      /> :
                      <h2 style={{color: 'red'}}>Unable to load chart</h2>
                  }
                </div>
                <br/>
              </div>) : alert("Error loading data")
            }
        </div>)
        }
      </div>
    );
  }
}

export default App;
