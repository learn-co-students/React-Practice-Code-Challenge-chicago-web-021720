import React, { Fragment } from 'react'

const Table = (props) => {

  const renderPlates = num => {
    const plates = []
    for (let i = 0; i < num; i++) {
      plates.push(<div className="empty-plate" style={{ top: -7 * i }}/>)
    }
    return plates
  }

  return (
    <Fragment>
      <h1 className="remaining">
        You have: ${props.money} remaining!
      </h1>
      <div className="table">
        <div className="stack">
          {renderPlates(props.numPlates)}
        </div>
      </div>
    </Fragment>
  )
}

export default Table