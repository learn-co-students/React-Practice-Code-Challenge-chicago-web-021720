import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'


class SushiContainer extends React.Component {
  constructor(props){
    super()
  }

  renderSushis = () => {
    return Array.from(this.props.sushis).map((sushi,index) => <Sushi sushi={sushi} key={index} eatSushi={this.props.eatSushi}/>);
  }
  render(){
  return (
    <Fragment>
      <div className="belt">
        {
          this.renderSushis()
          /*
             Render Sushi components here!
          */
        }
        <MoreButton moveSushis={this.props.moveSushis} />
      </div>
    </Fragment>
  )
}
}

export default SushiContainer
