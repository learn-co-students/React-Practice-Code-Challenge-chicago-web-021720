import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

  const renderSushiComp = (props) => {
      return props.sushis.slice(0, 4).map(sushi => {
        return <Sushi key={sushi.id} sushi={sushi} eatSushi={props.eatSushi}  />
    })
  }

  return (
    <Fragment>
      <div className="belt">
        {
          renderSushiComp(props)
        }
        <MoreButton deleteSushi={props.deleteSushi} />
      </div>
    </Fragment>
  )
}

export default SushiContainer