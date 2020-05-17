import React from 'react';
import './App.css';

const url = 'https://api.thevirustracker.com/free-api?countryTotals=ALL';

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
      this.setState({success: true, allData: modifiedVirusData, selectedCountry: Object.keys(modifiedVirusData)[0]});
    })
    .catch((error) => {
      console.log(error);
      this.setState({success: false});
    });
    this.setState({loading: false});
  }
  stats = (event) => {
     this.setState({selectedCountry: event.target.value});
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
                <select onChange = {this.stats} value={selectedCountry}>
                  {Object.keys(allData).map((element) => (<option key={element} value={element} label={allData[element].title}/>))}
                </select>
                {Object.keys(allData[selectedCountry]).filter(key => key !== 'title').map((key) => {
                  return (<div key={key}>
                    <br/>
                    <div>{this.prettify(key)} = {allData[selectedCountry][key]}</div>
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
