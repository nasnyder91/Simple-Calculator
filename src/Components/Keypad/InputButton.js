import React, { Component } from 'react';
import '../../App.css';

class InputButton extends Component {
  buttonPressed(value){
    this.props.buttonPressed(value);
  }

  render() {
    const rc = this.props.rc;
    const classes = rc+' InputButton ' + (this.props.highlight ? 'btnHighlighted' : null);

    let btnValue = this.props.btnValue;
    return (
      <div className={classes} onClick={this.buttonPressed.bind(this,btnValue)} >
        <h4>{btnValue}</h4>
      </div>
    );
  }
}

export default InputButton;
