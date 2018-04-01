import React, { Component } from 'react';
import './Styles/App.css';
import Resuts from './Components/results'
import Search from './Components/form'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {restaurants: [],
      values: '',
      isLoaded: false,


    }
  }

  componentDidMount() {
    const apiHeaders = new Headers()
    // const location = navigator.geolocation
    
    //Get location params by City
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=Austin?geometry')
      .then(res => res.json())
      .then(
        (result) => {
          const geoLoc = result.results[0].geometry.location
          this.setState({lat: geoLoc.lat, long: geoLoc.lng})
          
          // location.getCurrentPosition((position)=>{
            //   console.log(position.coords.latitude, position.coords.longitude)
            //   this.setState({lat: position.coords.latitude, long: position.coords.longitude})
            // })
          }
        )
         .then(
           (data)=> {   
            apiHeaders.append('user-key', '0ceda440b15e277c481abff59a44f63f')
            
            // fetch('https://developers.zomato.com/api/v2.1/cuisines?city_id=278',
            fetch(`https://developers.zomato.com/api/v2.1/search?lat=${this.state.lat}&lon=${this.state.long}&cuisines=168&sort=rating&order=desc`,
            {headers: apiHeaders})
            .then(res => res.json())
            .then(
              (result) => {
                const restArr = []
                result.restaurants.forEach((type)=>{
                  restArr.push(type.restaurant)
                })
                this.setState({
                  isLoaded: true,
                  restaurants: restArr
                })
              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                })
              }
            )
            .then(
              (categories)=>{
                fetch('https://developers.zomato.com/api/v2.1/categories',
              {headers:apiHeaders})
            .then(res=>res.json())
            .then(
              (result)=>{
                const catArr = []
                result.categories.forEach((category)=>{
                  catArr.push(category.categories.name)
                })
                this.setState({categories: catArr})
              }
            )
              }
            )
          })
  }






  render() {

    const stylesheet = {
      paper:{
        left: '50px',
        top: '20%',
        width: '32%',
        height: '65%',
        position: 'fixed',
        overflowY: 'scroll'
      },
      results: {
        width: '95%',
        position: 'relative',
        left: '2.5%',
        
      },
      cardText: {
        marginLeft: 0
      }
    }

    return (
      <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Where to Grub?</h1>
        </header>
        <section>
          <Paper style={stylesheet.paper} zDepth={4}>
            {/* <Search
              category={this.state.categories}
              categoryClicked={this.handleCategoryClicked}
              value={this.state.value}
            /> */}
            <Resuts 
              style={stylesheet.results}
              data={this.state.restaurants}
              
            />
          </Paper>
        </section>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
