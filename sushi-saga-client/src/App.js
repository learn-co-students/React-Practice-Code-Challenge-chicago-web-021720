import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor(){
    super()
    this.state ={
      sushis: [],
      money: 100,
      plates: []
    }
  }

  componentDidMount(){
    fetch(API)
    .then(r=>r.json())
    .then(fetSushis => {
      const sushis = fetSushis.map(sushi => {
        const newObj = Object.assign({}, sushi)
        newObj.isEaten = false;
        return newObj
      })
      this.setState({ sushis: [...sushis] })
    })
  }

  deleteSushi = () => {
    const updatedSushis = this.state.sushis.filter(sushi =>{
      return !sushi.isEaten 
    })
    this.setState({  
      sushis: [...updatedSushis]
    })
  }

  eatSushi = (id) => {
    let sushiPrice = 0
    const updatedSushis = this.state.sushis.map(sushi =>{
      if (sushi.id === parseInt(id)){
        if (sushi.price < this.state.money && !sushi.isEaten) {
          sushiPrice = sushi.price
          sushi.isEaten = true
          this.setState(prevState => ({  
            sushis: [...updatedSushis],
            money: prevState.money - sushiPrice,
            plates: [...prevState.plates, 1] 
          }))
        } 
      }
      return sushi
    })

  }

  


  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.state.sushis} eatSushi={this.eatSushi}deleteSushi={this.deleteSushi}/>
        <Table plates={this.state.plates} money={this.state.money} />
      </div>
    );
  }
}

export default App;