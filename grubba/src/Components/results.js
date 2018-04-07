import React, { Component } from 'react';
import {Card, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import Rating from 'react-rating'


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
      article: {

      }
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

  renderCardContent = (data) =>{
    return(
      <section>
        <article>
          <div>
            <a href={data.url}>{data.name}</a>
          </div>
          <div>
            <a href={data.menu_url}>{`${data.name}'s Menu`}</a>
          </div>
          <div>
            <p>{`$ for 2 $${data.average_cost_for_two}`}</p>
          </div>
        </article>
        <article>
        </article>
      </section>
    )
  }

  render(){

    const stylesheet = {
      card: {
        height: '300px',
        backgroundColor: 'rgba(204, 91, 91, 0.842)',
      }
    }


    return(
      <div>
        {this.props.data.map((restaurant, key)=>{
          return (
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

              <CardText expandable={true}>
                {this.renderCardContent(restaurant)}

              </CardText>              
            </Card>
            )
          })
        }
      </div>
    )
  }
}