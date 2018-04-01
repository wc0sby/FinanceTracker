import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


export default class Search extends Component {

  state = { 
    value: '',
    lat: '',
    long: '',
    cuisines: [],
    cuisineDesired: '',
    city: ''
  }

  componentDidMount(){
    const apiHeaders = new Headers()
    apiHeaders.append('user-key', '0ceda440b15e277c481abff59a44f63f')
    fetch('http://ip-api.com/json')
    .then(res => res.json())
    .then(
      (location)=>{
        console.log(location)
        this.setState({lat:location.lat, long:location.lon})
      fetch(`https://developers.zomato.com/api/v2.1/cuisines?lat=${this.state.lat}&lon=${this.state.long}`,
        {headers:apiHeaders})
      .then(res=>res.json())
      .then(
        (result)=>{
          console.log(result)
          const cuisineArr = []
          result.cuisines.forEach((cuisine)=>{
            cuisineArr.push(cuisine.cuisine.cuisine_name)
          })
          this.setState({cuisines: cuisineArr})
        }
      )}
    )}


  updateLocation = () =>{
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.city}?geometry`)
    .then(res => res.json())
    .then(
      (result) => {
        const geoLoc = result.results[0].geometry.location
        this.setState({lat: geoLoc.lat, long: geoLoc.lng})
        }
      )
  }

  handleCategoryClicked = (event, index, value) =>{this.setState({cusinedesired: value})}

  handleTextInputUpdates = (e) =>{
    this.setState({city: e.target.value})
  }


  renderCategories = () => { 
    return <DropDownMenu value={this.state.cusinedesired} onChange={this.handleCategoryClicked}>
      {this.state.cuisines.map((cuisine, key)=>{
        return <MenuItem value={key} key={key} primaryText={cuisine}/>
      })}
    </DropDownMenu>
  }

  render(){
    const stylesheet = {
      form:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      },
      button:{
        width: '10pc'
      },
      section:{
        flex: '1'
      }
    }
    return(
      <div>
        {/* This is for the user to input City */}
        <form style={stylesheet.form}>
          <section>
        <TextField
          // hintText="City"
          floatingLabelText="City"
          onChange={this.handleTextInputUpdates}
          onFocus={this.updateLocation}
          />
          </section>
          <section>

        {/* This is for the user to select their State */}
        <DropDownMenu onFocus={this.updateLocation}>
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
        </DropDownMenu>
        </section>
        <section style={stylesheet.section}>
        {this.renderCategories()}
        </section>
        <RaisedButton 
          label="Search"
          secondary={true}
          style={stylesheet.button}
        />
      </form>
      </div>
    )

  }

}