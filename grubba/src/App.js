import React, { Component } from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import './Styles/App.css';
import Resuts from './Components/results';
import Search from './Components/form';
import GrubBar from './Components/appbar';
import InfoCard from './Components/infoCard';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {restaurants: [],
      values: '',
      isLoaded: false,
      drawerOpen: false,
      infoOpen: false,
      lat: '',
      long: '',
      cuisines: [],
      cuisineID: 168,
      cuisineDesired: 0,
      clickedRest: 0
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
          
        })
      .then(
          (data)=> {   
            
      apiHeaders.append('user-key', '0ceda440b15e277c481abff59a44f63f')
      fetch(`https://developers.zomato.com/api/v2.1/search?count=100&lat=${this.state.lat}&lon=${this.state.long}&cuisines=${this.state.cuisineID}&sort=rating&order=desc`,
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
        (cuisines)=>
        fetch(`https://developers.zomato.com/api/v2.1/cuisines?lat=${this.state.lat}&lon=${this.state.long}&`,
        {headers:apiHeaders})
      .then(res=>res.json())
      .then(
        (result)=>{
          const cuisineArr = []
          result.cuisines.forEach((cuisine)=>{
            cuisineArr.push(cuisine.cuisine)
          })
          this.setState({cuisines: cuisineArr})
        }
      )
       )
   })
  }

  handleNewSearchCall = () =>{
    console.log(this.state)
    const apiHeaders = new Headers()
    this.setState({isLoaded:false})
    apiHeaders.append('user-key', '0ceda440b15e277c481abff59a44f63f')
    // fetch('https://developers.zomato.com/api/v2.1/cuisines?city_id=278',
    fetch(`https://developers.zomato.com/api/v2.1/search?count=100&lat=${this.state.lat}&lon=${this.state.long}&cuisines=${this.state.cuisineID}&sort=rating&order=desc`,
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
    this.setState({drawerOpen: false, clickedRest: 0})
  }

  handleCategoryClicked = (event, index, value) =>{this.setState({cuisineDesired: index, cuisineID: this.state.cuisines[index].cuisine_id})}

  handleToggle = () => this.setState({drawerOpen: !this.state.open})

  handleID = (id) => {this.setState({clickedRest: id, infoOpen: !this.state.infoOpen})}

  // handleInfo = () => {this.setState({infoOpen: this.state.open})}


  renderLoadBar = () =>{
    return(
      <div style={{margin: '50%'}}>
        <CircularProgress size={80} thickness={5} />
      </div>
    )
  }

  renderAppBar = () =>{
    return(
    <GrubBar
      toggle={this.handleToggle}
      open={this.state.drawerOpen}
      change={(drawerOpen)=>this.setState({drawerOpen})}
      close={this.handleClose}
      category={this.state.categories}
      categoryClicked={this.handleCategoryClicked}
      value={this.state.value}
      cuisines={this.state.cuisines}
      handleCategoryClicked={this.handleCategoryClicked}
      cuisineDesired={this.state.cuisineDesired}
      handleNewSearchCall={this.handleNewSearchCall}
    />
    )
  }


  renderResults = (style) =>{
    return this.state.isLoaded
    ? (
      <Resuts 
        style={style}
        data={this.state.restaurants}
        handleID={this.handleID}
      />
    )
    :''
  }

  renderInfoCard = (stylesheet) => {
    return(
    <Paper
      style={stylesheet.infoPaper}
      id='infobar'
      className={this.state.infoOpen?'slideIn':'slideOut'}
      zDepth={4}
      >
        <InfoCard
          style={stylesheet.results}
          data={this.state.restaurants[this.state.clickedRest]}
        />
      </Paper>
    )
  }

  render() {

    const stylesheet = {
      paper:{
        left: '50px',
        top: '20%',
        width: '32%',
        height: '65%',
        position: 'fixed',
        overflowY: 'scroll',
      },
      results: {
        width: '95%',
        height: !this.state.restaurants.featured_image?'280px':'auto',
        position: 'relative',
        left: '2.5%',
        padding: '25px, 25px',
      },
      infoPaper: {
        position: 'fixed',
        top: '20%',
        width: '32%',
        textAlign: 'right',
        backgroundColor: 'grey, white',
        opacity: '.8'
      }
    }

    const muiTheme = getMuiTheme({
      appBar: {
        backgroundColor: 'red'
      }
    })

    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <div className="App" onClick={this.handleInfo}>
        {this.renderAppBar()}

        <header className="App-header">
          <h1 className="App-title">Let's Grubbus Some Food!</h1>
        </header>

        {this.renderInfoCard(stylesheet)}

        <section>
          <Paper style={stylesheet.paper} zDepth={4}>
            {this.state.isLoaded?this.renderResults(stylesheet.results):this.renderLoadBar()}
          </Paper>
        </section>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
