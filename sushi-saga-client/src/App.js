import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor() {
    super()
    this.state = {
      allSushis: [],
      sushis: [],
      sushiCount: 4,
      eatenSushis: [],
      remainingMoney: 100
    }

  }
  onMoreSushiClick = () => {
    const newSushiCount = this.state.sushiCount + 4
    const newSushis = this.state.allSushis.slice(this.state.sushiCount, newSushiCount)
    this.setState({
      sushis: newSushis,
      sushiCount: newSushiCount
    })

  }

  onSushiClick = (event) => {
    const eatenSushi = this.state.sushis.filter(sushi => {
      return sushi.id === parseInt(event.target.id)
    })[0]
    if (this.state.remainingMoney > eatenSushi.price) {
      this.setState(prevState => ({
        eatenSushis: [...prevState.eatenSushis, eatenSushi],
        remainingMoney: prevState.remainingMoney - eatenSushi.price
      }))
      event.target.src = ''
    }
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(response => {
      this.setState({
        allSushis: response,
        sushis: response.slice(0,4)
      })
    })
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.state.sushis} onMoreSushiClick={this.onMoreSushiClick} onSushiClick={this.onSushiClick} eatenSushis={this.state.eatenSushis}/>
        <Table eatenSushis={this.state.eatenSushis} remainingMoney={this.state.remainingMoney}/>
      </div>
    );
  }
}

export default App;