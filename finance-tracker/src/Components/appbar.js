import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Search from '../Components/form';


export default class GrubBar extends Component {

  renderSearch = () =>{
    return (
      <Search
        cuisines={this.props.cuisines}
        categoryClicked={this.props.categoryClicked}
        value={this.props.value}
        formBttn={this.props.formBttn}
        handleCategoryClicked={this.props.handleCategoryClicked}
        cuisineDesired={this.props.cuisineDesired}
        handleNewSearchCall={this.props.handleCategoryClicked}
      />
    )
  }

  render(){
    return(
      <div>
      <AppBar
        title="Grubba"
        onLeftIconButtonClick={this.props.toggle}
      />
      <Drawer
          docked={false}
          width={400}
          open={this.props.open}
          onRequestChange={this.props.change}
        >
          {this.renderSearch()}
        </Drawer>
      </div>
    )
  }

}