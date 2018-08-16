import React, { Component } from 'react';

class TargetComponent extends Component {
  render(){
    return(
      <svg x={this.props.targetPosX+ "px"} y={this.props.targetPosY+ "px"}>
        <g stroke="#9b59b6" fill="#9b59b6">
          <rect x="38" y="45.8" width="6" height="9"/>
          <rect x="56" y="45.8" width="6" height="9"/>
          <path d="M74,36.3v-5.5h-3v-7H61v3.5h-8.5v7h-5v-7H39v-3.5H29v7h-3v5.5h-6.5v18h3v3h7v6h5v3h-5v10h8v-7h9v-6h7v6h9v7h8v-10h-5v-3h5   v-6h7v-3h3v-18H74z M34.5,73.3h-2v-4h2V73.3z M71,36.3h-0.5v3h-3v-3h-3v-2.5H71V36.3z M64,26.8h4v4h-4V26.8z M32,26.8h4v4h-4V26.8z    M29,33.8h6.5v2.5h-3v3h-3v-3H29V33.8z M67.5,69.3v4h-2v-4H67.5z M77.5,51.3h-3v3h-7v6h-5v6h-6v-6h-13v6h-6v-6h-5v-6h-7v-3h-3v-12   h4v12h5v-9h4v-3h3v-3h2v-6h4v7h11v-7h4v6h2v3h3v3h4v9h5v-12h4V51.3z"/>
        </g>
      </svg>
    )
  }
}

export default TargetComponent;
