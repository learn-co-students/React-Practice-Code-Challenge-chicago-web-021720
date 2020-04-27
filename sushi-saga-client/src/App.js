import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor() {
    super()
    this.state = {
      sushiIndex: 0,
      sushis: [],
      budget: 60
    }
  }

  componentDidMount() {
    fetch(API)
      .then(resp => resp.json())
      .then(sushis => {
        this.setState({
          sushis: sushis.map(sushi => {
            return {...sushi, eaten: false}
          })
        })
      })
  }

  selectFourSushis = () => {
    return this.state.sushis.slice(this.state.sushiIndex, (this.state.sushiIndex + 4))
  }

  emptyPlates = () => {
    return this.state.sushis.filter(sushi => sushi.eaten === true)
  }

  handleEatClick = id => {
    const sushi = this.state.sushis.find(sushi => sushi.id === id)
    if(sushi.eaten === false && sushi.price <= this.state.budget) {
      this.setState(prevState => {
        const updatedSushis = prevState.sushis.map(sushi => {
          if(sushi.id === id) {
            return {
              ...sushi,
              eaten: true
            }
          } else {
            return sushi
          }
        })
        
        return {
          sushis: updatedSushis,
          budget: prevState.budget - sushi.price
        }
      })
    }

  }

  handleMoreButton = event => {
    this.setState(prevState => {
      const newIndex = prevState.sushiIndex + 4
      if(newIndex > (prevState.sushis.length - 1)) {
        return {
          sushiIndex: 0
        }
      } else {
        return {
          sushiIndex: prevState.sushiIndex + 4
        }
      }
    })
  }

  render() {
    const sushis = this.selectFourSushis()
    return (
      <div className="app">
        <SushiContainer
          handleMoreButton={this.handleMoreButton}
          handleEatClick={this.handleEatClick}
          sushis={sushis}
          />
        <Table
          budget={this.state.budget}
          plates={this.emptyPlates()}
          />
      </div>
    );
  }
}

export default App;