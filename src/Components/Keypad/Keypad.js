import React, { Component } from 'react';
import '../../App.css';
import InputButton from './InputButton';

const btns = [
  ['AC','/','*','-'],
  [7,8,9,'+'],
  [4,5,6],
  [1,2,3],
  ['.',0,'','=']
];

class Keypad extends Component {
  buttonPressed(value){
    this.props.buttonPressed(value);
  }

  render() {
    let btnDisplay = [];
    for(var r = 0; r < btns.length; r++){
      let row = btns[r];

      for(var c = 0; c < row.length; c++){
        let input = row[c];

        btnDisplay.push(<InputButton btnValue={input} rc={"Btn"+r+""+c} buttonPressed={this.buttonPressed.bind(this)} key={r + "-" + c} highlight={this.props.highlight === input}/> );
      }
    }

    return (
      <div className="Keypad">
        {btnDisplay}
      </div>
    );
  }
}

export default Keypad;
