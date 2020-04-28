import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';


const APIBASE = "http://localhost:3000"


class App extends Component {

  constructor() {
    super()

    this.state = {
      sushis: [],
      money: 100,
      emptyPlates: 0,
      sushisIndex: 0
    }

    this.fetchSushis = this.fetchSushis.bind(this)
    this.handleSushiClick = this.handleSushiClick.bind(this)
    this.handleMoreClick = this.handleMoreClick.bind(this)
    this.getSushisToRender = this.getSushisToRender.bind(this)
  }

  fetchSushis() {
    fetch(APIBASE + '/sushis')
      .then(resp => resp.json())
      .then(sushis => {
        this.setState({
          sushis: sushis
        })
      })
  }

  componentDidMount() {
    this.fetchSushis()
  }

  handleSushiClick(event) {
    // Find the sushi that was clicked on
    const clickedSushi = this.state.sushis.find(sushi => sushi.id === parseInt(event.target.parentElement.parentElement.id))

    // Make sure the user can afford the sushi
    if (clickedSushi.price > this.state.money) {
      alert("Can't afford that Sushi!")
      return
    }

    // Set new state
    this.setState(prevState => {
      
      // Update the sushis so that the clicked sushi is now `eaten: true`
      const newSushis = []
      prevState.sushis.forEach(sushi => {
        newSushis.push(sushi.id === clickedSushi.id ? {...sushi, eaten: true} : sushi)
      })

      return {
        money: prevState.money - clickedSushi.price,
        emptyPlates: prevState.emptyPlates + 1,
        sushis: newSushis
      }
    })
  }

  getSushisToRender() {
    const { sushisIndex } = this.state
    return this.state.sushis.slice(sushisIndex, sushisIndex + 4)
  }

  handleMoreClick() {
    this.setState(prevState => {
      return {
        sushisIndex: prevState.sushisIndex + 4
      }
    })
  }

  render() {
    const { money, emptyPlates } = this.state
    return (
      <div className="app">
        <SushiContainer sushis={this.getSushisToRender()} handleSushiClick={this.handleSushiClick} handleMoreClick={this.handleMoreClick}/>
        <Table money={money} numPlates={emptyPlates} />
      </div>
    );
  }
}

export default App;