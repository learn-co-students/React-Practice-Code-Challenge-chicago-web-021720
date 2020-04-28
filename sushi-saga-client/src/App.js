import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"


class App extends Component {
  constructor(props){
    super()
    this.state = {
      sushis: '',
      currentSushi: 0,
      emptyPlates: 0,
      budget: 100,
      money: 0
    }
    this.handleMoneyChange = this.handleMoneyChange.bind(this);
    this.handleMoneySubmit = this.handleMoneySubmit.bind(this);
    this.eatSushi = this.eatSushi.bind(this);
    this.moveSushis = this.moveSushis.bind(this);
    this.nextSushis = this.nextSushis.bind(this);
  }

  componentDidMount(){
    fetch(API)
      .then(response => response.json())
      .then(data => {
        // const sushis = this.uniqueKeys(Array.from(data));
        this.setState({sushis: Array.from(data)});
      });
  }

  moveSushis = () => {
    const cur = this.state.currentSushi;
    const max = this.state.sushis.length;
    if(cur + 4 >= max){
      this.setState(Object.assign({},this.state,{currentSushi: 0}))
    }
    else {
      this.setState(Object.assign({},this.state,{currentSushi: this.state.currentSushi + 4}));
    }

  }
  nextSushis = () => {
    const max = this.state.sushis.length;
    let cur = this.state.currentSushi;
    const next = cur + 4;
    return this.state.sushis.slice(cur,cur + 4);
  }

  handleMoneyChange = event => {
    this.setState(Object.assign({},this.state,{},{money: event.target.value}));
  }

  handleMoneySubmit = event => {
    event.preventDefault();
    const newBudget = parseInt(this.state.budget) + parseInt(this.state.money);
    this.setState(
      Object.assign({},this.state,{budget: newBudget},{money: 0})
    );
    console.log(event.target.money.value);
  }

  eatSushi = event => {
    const newPlates = this.state.sushis;
    const id = event.target.tagName === 'IMG' ? event.target.parentNode.dataset.id
      : event.targetset.dataset.id;
    newPlates[id - 1].img_url = '';
    const price = newPlates[id - 1].price;
    const newBudget = this.state.budget - price;
    if(newBudget > 0){
      this.setState(
        Object.assign(
          {},
          this.state,
          {budget: this.state.budget - price},
          {sushi: newPlates},
          {emptyPlates: this.state.emptyPlates + 1}
        )
      )
    }
  }



  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.nextSushis()} moveSushis={this.moveSushis} eatSushi={this.eatSushi}/>
        <Table emptyPlates={this.state.emptyPlates} budget={this.state.budget} handleMoneyChange={this.handleMoneyChange} handleMoneySubmit={this.handleMoneySubmit} money = {this.state.money}/>
      </div>
    );
  }
}

export default App;
