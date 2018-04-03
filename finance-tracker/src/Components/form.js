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
    cuisineDesired: 'Burger',
    city: 'Austin'
  }

  // componentDidMount(){
  //   const apiHeaders = new Headers()
  //   apiHeaders.append('user-key', '0ceda440b15e277c481abff59a44f63f')
  //     fetch(`https://developers.zomato.com/api/v2.1/cuisines?lat=${this.props.lat}&lon=${this.props.long}`,
  //       {headers:apiHeaders})
  //     .then(res=>res.json())
  //     .then(
  //       (result)=>{
  //         console.log(result)
  //         const cuisineArr = []
  //         result.cuisines.forEach((cuisine)=>{
  //           cuisineArr.push(cuisine.cuisine.cuisine_name)
  //         })
  //         this.setState({cuisines: cuisineArr})
  //       }
  //     )}
    


  // handleCategoryClicked = (event, index, value) =>{this.setState({cuisineDesired: index})}

  handleTextInputUpdates = (e) =>{
    this.setState({city: e.target.value})
  }


  renderCategories = () => { 
    const cuisines = this.props.cuisines
    const index = cuisines ? cuisines[this.props.cuisineDesired] : ''
    
    return <DropDownMenu 
            value={this.props.cuisineDesired}
            // value={index ? console.log(index.cuisine_id) : ''}      
            onChange={this.props.handleCategoryClicked}>
      { cuisines
        ?(cuisines.map((cuisine, key)=>{
          return <MenuItem value={key} key={key} primaryText={cuisine.cuisine_name}/>
            })
        )
        :''
      }
    </DropDownMenu>
  }

  render(){
    const stylesheet = {
      form:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'space-between',
      },
      button:{
        margin: '10px',
        alignSelf: 'flex-end'
      },
      text:{
        alignSelf: 'flex-start'
      },
      input:{
        padding: '10px',
        margin: '10px',
      }
    }
    return(
      <div>
        {/* This is for the user to input City */}
        <form style={stylesheet.form}>
          <section style={stylesheet.text}>
            <TextField
              defaultValue={this.state.city}
              disabled={true}
              floatingLabelText="Current City"
              onChange={this.handleTextInputUpdates}
              onFocus={this.updateLocation}
              // style={stylesheet.text}
              style={stylesheet.input}
            />
          </section>
          <section style={stylesheet.text}>
            {this.renderCategories()}
          </section>
          <section style={stylesheet.button}>
            <RaisedButton 
              label="Search"
              secondary={true}
              onClick={this.props.handleNewSearchCall}
            />
          </section>
        </form>
      </div>
    )

  }

}