import React, { Component } from 'react';
import Lista from '../Lista';


class Tabuleiro extends Component{

constructor(props){

    super(props);
    this.state = {
        listas: this.criarTabuleiro(props)
    };

}

componentRecebedorDeProps(proximoProps) {
    if (
      this.props.CelulasAberta > proximoProps.CelulasAberta ||
      this.props.colunas !== proximoProps.colunas
    ) {
      this.setState({
        listas: this.criarTabuleiro(proximoProps)
      });
    }

}


//criando uma matriz como tabuleiro
criarTabuleiro = props => {
    let Tabuleiro = [];

    {/*linhas */}
    for(let i = 0; i < props.listas; i++){
        Tabuleiro.push([]);

        {/*colunas */}
        for(let j = 0; j < props.colunas; j++){
            Tabuleiro[i].push(

            {
                x: j,
                y: i,
                count: 0,
                isOpen: false,
                hasMine:false,
                hasFlag: false,
            });
        }
    }
        {/*minas */}
        for(let i = 0; i < props.minas; i++){
            let linhaAleatoria = Math.floor(Math.random() * props.listas); 
            let colunaAleatoria = Math.floor(Math.random() * props.colunas);

            let celula = Tabuleiro[linhaAleatoria][colunaAleatoria]

        if(celula.hasMine){
            i--;
        }else{
            celula.hasMine = true;
        }
        
        
        
    };
    return Tabuleiro;

    
{/*tabela */}
console.table(Tabuleiro);
}




abrir = celula => {
    if (this.props.status === "ended") {
      return;
    }
    // first we need to find minas around it asynchronously. this is IMPORTANT, because we need to make sure we calculate the minas before anything else runs!!!
    let asyncCountminas = new Promise(resolve => {
      let minas = this.acharMinas(celula);
      resolve(minas);
    });

    asyncCountminas.then(NumeroDeMinas => {
      let listas = this.state.listas;

      let atual = listas[celula.y][celula.x];

      if (atual.hasMine && this.props.CelulasAberta === 0) {
        console.log("mine was on first click");
        let novolistas = this.createBoard(this.props);
        this.setState({ listas: novolistas }, () => {
          this.open(celula);
        });
      } else {
        if (!celula.hasFlag && !atual.isOpen) {
          this.props.oncelulaClick();

          atual.isOpen = true;
          atual.count = NumeroDeMinas;

          this.setState({ listas });
        
          if (!atual.hasMine && NumeroDeMinas === 0) {
            this.openAroundcelula(celula);
          }

          if (atual.hasMine && this.props.CelulasAberta !== 0) {
            this.props.endGame();
          }
        }
      }
    });
  };








  findminas = cell => {
    let minasInProximity = 0;
    // look for minas in a 1 cell block around the chosen cell
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < this.state.listas.length &&
            cell.x + col < this.state.listas[0].length
          ) {
            if (
              this.state.listas[cell.y + row][cell.x + col].hasMine &&
              !(row === 0 && col === 0)
            ) {
              minasInProximity++;
            }
          }
        }
      }
    }
    return minasInProximity;
  };


  openAroundCell = cell => {
    let listas = this.state.listas;

    // we're gonna loop through each cell and open cells one by one in each row around it until we find one with a mine in it
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < this.state.listas.length &&
            cell.x + col < this.state.listas[0].length
          ) {
            if (
              !this.state.listas[cell.y + row][cell.x + col].hasMine &&
              !listas[cell.y + row][cell.x + col].isOpen
            ) {
              this.open(listas[cell.y + row][cell.x + col]);
            }
          }
        }
      }
    }
  };



render(){
    let listas = this.state.listas.map((celulas, index) => (
      
            <Lista
            celulas={celulas}
            key={index}
            open={this.open}
            flag={this.flag}
            />
     ) );
    return <div className="board">{listas}</div>
  }
}

export default Tabuleiro;