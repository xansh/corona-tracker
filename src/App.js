import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import './App.css';
import StatBox from './StatBox';

const url = 'https://api.thevirustracker.com/free-api?countryTotals=ALL';
const defaultCountry = 'IN';

class App extends React.Component {
  state = {selectedCountry: '', allData: {}, loading: true, success: false};
  async componentDidMount()
  {
    await fetch(url)
    .then(async (response) => {
      const responseData = await response.json();
      let virusData = responseData.countryitems[0];
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
    this.setState({loading: false});
  }
  onSelectCountry = (value) => {
     this.setState({selectedCountry: value});
  }
  render() {
    const {selectedCountry, allData, loading, success} = this.state;
    return (
      <div className="App">
        {loading?
          (<h1>Loading...</h1>) :
          (<div>
            {success?
              (<div>
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
                    newValue={allData[selectedCountry].total_new_cases_today}/>
                  <StatBox
                    title={'Total Active Cases'}
                    value={allData[selectedCountry].total_active_cases}/>
                  <StatBox
                    title={'Total Recovered'}
                    value={allData[selectedCountry].total_recovered}/>
                  <StatBox
                    title={'Total Deaths'}
                    value={allData[selectedCountry].total_deaths}
                    newValue={allData[selectedCountry].total_new_deaths_today}/>
              </div>) : alert("Error loading data")
            }
        </div>)
        }
      </div>
    );
  }
}

export default App;
