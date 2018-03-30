import React, { Component } from 'react';
import logo from './logo.svg';
import './Styles/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {list: [],
      values: '',
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch()
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  handleButtonPressed = () =>{
    this.setState({list:[...this.state.list,this.state.values],
       values:''})
  }

  handleTextInputUpdates = (e) =>{
    this.setState({values: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Finance Tracker</h1>
        </header>
        <section>
          <input type="text" value={this.state.values} onChange={this.handleTextInputUpdates}></input>
          <button onClick={this.handleButtonPressed}>Click Me</button>
        </section>
        <ul style={{margin: 0}}>
          {this.state.list.map((item)=>{
            return <p>{item}<button>x</button></p>
          })}
          </ul>
      </div>
    );
  }
}

export default App;
