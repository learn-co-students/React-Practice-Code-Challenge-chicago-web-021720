import React, { Fragment } from 'react'

const Sushi = (props) => {
  const { id, img_url, name, price, isEaten } = props.sushi

  return (
    <div className="sushi">
      <div className="plate" 
           onClick={e => props.eatSushi(e.target.id)}>
        { 
          isEaten ?
            null
          :
          <img src={img_url} width="100%" id={id} />
        }
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  )
}

export default Sushi