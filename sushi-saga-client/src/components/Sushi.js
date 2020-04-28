import React from 'react'


const Sushi = props => {

  const { id, onClick, eaten, img_url, name, price } = props

  return (
    <div className="sushi" id={id}>
      <div className="plate" onClick={onClick}>
        { eaten ? null : <img src={img_url} width="100%" alt="a sushi" />}
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  )
}


export default Sushi
