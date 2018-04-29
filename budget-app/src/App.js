import React, { Component } from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './Components/nav';
import Transactions from './Components/table';
import AppChart from './Components/graph';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <NavBar/>
        {/* <header className="App-header">
          <h1>Budget App</h1>
        </header> */}
        <div className="main-container">
          {/* container for charts and data */}
          <section className="chart-container">
            {/* container for charts */}
            <article className="chart">
              Chart
              <AppChart/>
            </article>
            <article className="chart">
              Chart
              <AppChart/>
            </article>
            <article className="chart">
              Chart
              <AppChart/>
            </article>
          </section>
          <section className="data-container">
            <nav className="data-tabs">

            </nav>
            <article className="data">
              Transactions
              <Transactions/>
            </article>
          </section>
        </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
