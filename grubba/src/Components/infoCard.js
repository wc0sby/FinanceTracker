import React, { Component } from 'react'
import Card, { CardText, CardActions, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';

export default class InfoCard extends Component {

  renderInfo = () =>{
    const data = this.props.data
    const stylesheet = {
      content: {
        marginLeft: '20%',
      },
      paragraph: {
        textAlign: 'left'
      }
    }
    return data
      ? (
        <Card>
          <CardTitle title={data.name} subtitle={data.location.address}/>
          <CardText style={this.props.style}>
            <div style={stylesheet.content}>
              <section>
                <article style={stylesheet.paragraph}>

                    <p>{`${data.name} cuisines include ${data.cuisines}.  The average cost for two to dine here is approximately ${data.currency}${data.average_cost_for_two}`}</p>

                </article>
              </section>
            </div>
          </CardText>
          <CardActions>
            <FlatButton label="Website" href={data.url}/>
            <FlatButton label="Menu" href={data.menu_url}/>
          </CardActions>
      </Card>)
      : ''
  }
  
  render(){
    return(
      <div>
      {this.renderInfo()}
      </div>
    )
  }

}