import React from "react";
import Celula from "../Celula";

const Lista = props => {
  let celulas = props.celulas.map((data, index) => {
    return (
      <Celula key={index} data={data} aberto={props.aberto} bandeira={props.bandeira} />
    )
  }
  ) 
  return <div className="row">
    {celulas}
  </div>;
};

export default Lista;