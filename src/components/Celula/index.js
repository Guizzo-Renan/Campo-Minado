import React from "react";



const Celula = props => {
 
  let CelulaAleatoria = () => {
    if(props.data.isOpen){
      return (
          <div className="cell open"></div>
      )
    }else{
        return(<div className="cell"></div>)
    }
  }


      return (
        CelulaAleatoria()
      );
    }


export default Celula;