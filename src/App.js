import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import './App.css';

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
  prettify = (name) => (name.split('_').join(' '));
  render() {
    const {selectedCountry, allData, loading, success} = this.state;
    return (
      <div className="App">
        {loading?
          (<h1>Loading...</h1>) :
          (<div>
            {success?
              (<div>
                <h2>Countries</h2>
                <br/>
                <ReactFlagsSelect
                  searchable
                  onSelect={this.onSelectCountry}
                  countries={Object.keys(allData)}
                  defaultCountry={selectedCountry}
                />
                {Object.keys(allData[selectedCountry]).filter(key => key !== 'title').map((key) => {
                  return (<div key={key}>
                    <br/>
                    <div className="App-contentDetail">{this.prettify(key)} = {allData[selectedCountry][key]}</div>
                  </div>);
                })}
              </div>) : alert("Error loading data")
            }
        </div>)
        }
      </div>
    );
  }
}

export default App;
