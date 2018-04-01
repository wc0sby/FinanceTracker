import React, { Component } from 'react';
import {Card, CardHeader, CardActions, CardText, CardTitle, CardMedia} from 'material-ui/Card';


export default class Results extends Component{

  render(){

    return(
      <div>
        {this.props.data.map((restaurant, key)=>{
          return (
            <Card 
              key={key} 
              style={this.props.style}
              
            >
              <CardMedia actAsExpander={true}>
                <img src={restaurant.featured_image}  /> 
              </CardMedia>
              <CardHeader>
                {restaurant.name}
              </CardHeader>
              <CardText expandable={true}>
                {restaurant.user_rating.rating_text}
                {restaurant.user_rating.aggregate_rating}
                {restaurant.user_rating.votes}
              </CardText>
            </Card>
            )
          })
        }
      </div>
    )
  }
}