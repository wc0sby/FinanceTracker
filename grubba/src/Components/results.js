import React, { Component } from 'react';
import {Card, CardText, CardTitle, CardMedia, CardHeader} from 'material-ui/Card';
import Rating from 'react-rating'
import Divider from 'material-ui/Divider';


export default class Results extends Component{
  
  convertToNumber = (str) =>{
    return Number(str)
  }

  renderSubtitles = (data) =>{
    const styles = {
      section: {
        display:'flex',
        justifyContent:'space-between'
      },
    }

    return <section style={styles.section}>
      <article>
        {data.location.locality}
      </article>
      <article>
        <section>
        {`${data.user_rating.votes} votes `}
        <Rating
          readonly={true}
          initialRating={this.convertToNumber(data.user_rating.aggregate_rating)}
          emptySymbol={<i className="fa fa-star-o fa-1x"/>}
          fullSymbol={<i className="fa fa-star fa-1x" style={{color:`#${data.user_rating.rating_color}`}}/>}
          >
        </Rating>
        </section>
       </article>
    </section>
  }


  render(){

    const stylesheet = {
      card: {
        height: !this.props.data.featured_image?'280px':'auto'
        // padding: '5px, 5px'
        // backgroundColor: 'rgba(204, 91, 91, 0.842)',
      },
      // divider: {
      //   margin: '10px'
      // }
    }


    return(
      <div>
        {this.props.data.map((restaurant, key)=>{
          return (
            <div>
              <Card 
                key={key} 
                style={this.props.style}
              >
 
                <CardMedia 
                  // actAsExpander={true}
                  onClick={()=>this.props.handleID(key)}
                  style={stylesheet.card}
                  overlay={<CardTitle title={restaurant.name} subtitle={this.renderSubtitles(restaurant)}/>}
                >
                  <img src={restaurant.featured_image} alt='' /> 
                </CardMedia>           
              </Card>
              <Divider/>
            </div>
            )
          })
        }
      </div>
    )
  }
}