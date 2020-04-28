import React, { Fragment } from 'react'

const SushiWallet = (props) => {



  return (
    <form onSubmit={props.updateMoney}> 
        How Much Money You Trying to Get? 
        <input type="text" name="money" value={props.wallet} onChange={props.updateWallet} />
        <input type="submit" />
    </form>
  )
}

export default SushiWallet