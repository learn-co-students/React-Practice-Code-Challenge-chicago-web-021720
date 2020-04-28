import React, { Fragment } from 'react'

const Table = (props) => {

  const renderPlates = (array) => {
    return array.map((x, index) => {
      return <div className="empty-plate" style={{ top: -7 * index }}/>
    })
  }

  return (
    <Fragment>
      <h1 className="remaining">
        You have: ${ props.budget } remaining!
      </h1>
      <div className="table">
        <div className="stack">
          {
            renderPlates(new Array(props.emptyPlates).fill('a'))
            /*
               renderPlates takes an array
               and renders an empty plate
               for every element in the array
            */

          }
        </div>
      </div>
      <form onSubmit={props.handleMoneySubmit}>
        <label>
          Add Money
        </label>
        <input type="text" name="money" value={props.money} onChange={props.handleMoneyChange}/>
        <button type="submit" name="submit">Submit</button>
      </form>
    </Fragment>
  )
}

export default Table
