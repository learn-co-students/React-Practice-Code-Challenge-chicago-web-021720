import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'


const SushiContainer = props => {
    
  const renderSushi = sushi => {
    return <Sushi
            key={sushi.id}
            id={sushi.id}
            name={sushi.name}
            img_url={sushi.img_url}
            price={sushi.price}
            eaten={sushi.eaten || false}
            onClick={props.handleSushiClick}
          />
  }

  const renderSushis = () => props.sushis.map(renderSushi)
  
  return (
    <Fragment>
      <div className="belt">
        {renderSushis()}
        <MoreButton handleMoreClick={props.handleMoreClick}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer