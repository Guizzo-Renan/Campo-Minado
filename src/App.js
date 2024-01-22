import './App.css';
import React, { Component } from 'react';
import Tabuleiro from './components/Tabulero';
import Cabecalho from './components/Cabecalho';

class CaompoMinado extends Component{

state = {
    listas: 10,
    colunas: 10,
    bandeiras: 10,
    minas: 10,
    time:0
}

  render(){
    return (
    <div className='minesweeper'>
      <Cabecalho time={this.state.time} flagCount={this.state.bandeiras}/>
      <Tabuleiro listas={this.state.listas} colunas={this.state.colunas} minas={this.state.minas}/>
    </div>
 );
  }
}

export default CaompoMinado;



/*
function App() {
  return (
    <div className="App">
      hey
    </div>
  );
}

export default App;
*/