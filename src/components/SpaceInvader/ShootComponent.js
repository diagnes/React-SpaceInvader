import React, { Component } from 'react';

class ShootComponent extends Component {
  render(){
    return(
      <svg x={this.props.shootPosX+ "px"} y={this.props.shootPosY+ "px"} height={this.props.shootSizePosY} width={this.props.shootSizePosX}>
        <line x1="0" y1="0" x2="0" y2={this.props.shootSizePosY} stroke={this.props.shootSizeColor} strokeWidth={this.props.shootSizePosX} />
      </svg>
    )
  }
}

export default ShootComponent;
