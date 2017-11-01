import React, { Component } from 'react';
import './App.css';
import Keypad from './Components/Keypad/Keypad';

class App extends Component {
  constructor(){
    super();
    this.state = {
      first: true,
      prevInput: 0,
      total: 0,
      currentInput: 0,
      output: 0,
      selectedSymbol: null,
      highlightSymbol: "",
      decimalPressed: false,
      decimalOutput: 0
    }
  }


  handleButtonPressed(value){
    switch (typeof value) {
      case 'number':
        return this.handleNumberPressed(value);
      case 'string':
        return this.handleStringInput(value);
      default: break;
    }
  }

  handleNumberPressed(number){
    let output;
    let decimalOut;

    if(!this.state.decimalPressed){
      output = (this.state.currentInput * 10) + number;
    }else{
      output = this.state.currentInput;
      decimalOut = (this.state.decimalOutput * 10) + number;
      output = output + decimalOut;
    }



    this.setState({
      output:output,
      currentInput:output,
      prevInput:output,
      highlightSymbol: ""
    });
  }

  handleStringInput(str){
    switch (str) {
      case 'AC':
        return this.allClear();
      case '/':
      case '*':
      case '-':
      case '+':
        this.setState({
          selectedSymbol: str,
          total: this.state.first ? this.state.output : this.doMath(this.state.total,this.state.selectedSymbol,this.state.output),
          output: this.state.first ? this.state.output : this.doMath(this.state.total,this.state.selectedSymbol,this.state.output),
          currentInput: 0,
          first: false,
          decimalPressed: false
        });
        this.handleHighlight(str);

        break;
      case '=':
        this.setState({
          total: this.doMath(this.state.total,this.state.selectedSymbol,this.state.prevInput),
          output: this.doMath(this.state.total,this.state.selectedSymbol,this.state.prevInput),
          currentInput: 0,
          first: true,
          decimalPressed: false
        });
        break;

      case '.':
        if((!this.state.decimalPressed) && (!String(this.state.output).includes('.'))){
          let output = this.state.output + '.';
          this.setState({
            decimalPressed: true,
            output: output,
            currentInput: output,
            decimalOutput: 0
          });
        }
        break;

      default:
    }
  }

  handleHighlight(str){
    if(this.state.highlightSymbol === str){
      this.setState({highlightSymbol:""});
    } else {
      this.setState({highlightSymbol:str});
    }
  }

  allClear(){
    this.setState({
      first: true,
      total: 0,
      currentInput: 0,
      output: 0,
      selectedSymbol: null,
      highlightSymbol: "",
      decimalPressed: false,
      decimalOutput: 0
    });
  }

  doMath(x,str,y){
    switch (str) {
      case '+': return (parseFloat(x) + parseFloat(y));
      case '-': return (parseFloat(x) - parseFloat(y));
      case '*': return (parseFloat(x) * parseFloat(y));
      case '/': return (parseFloat(x) / parseFloat(y));
      default: return null;
    }
  }

  render() {
    let highlight;
    if(this.state.selectedSymbol === this.state.highlightSymbol){
      highlight = this.state.selectedSymbol;
    } else{
      highlight = null;
    }
    return (
      <div className="App">
        <span className="Output">{this.state.output}</span>
        <Keypad buttonPressed={this.handleButtonPressed.bind(this)} highlight={highlight} />
      </div>
    );
  }
}

export default App;
