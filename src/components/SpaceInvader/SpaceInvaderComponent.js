import React, { Component } from 'react';

import PlayerComponent from './PlayerComponent';
import TargetComponent from './TargetComponent';
import ShootComponent from './ShootComponent';

class SpaceInvaderComponent extends Component {


  render() {
    return (
      <div>
        <svg width={this.props.width} height={this.props.height}>
          <PlayerComponent {...this.props}/>
          {this.props.targetInfo.map((target, index) =>{
            if(!target.targetDestroy){
              return <TargetComponent {...target} key={index}/>
            }
            return true;
          })}
          {this.props.shootInfo.map((shoot, index) =>{
            if(!shoot.shootDestroy){
              return <ShootComponent {...shoot} key={index}/>
            }
            return true;
          })}
        </svg>
        <div className="stats">
          <p>Vie : {this.props.playerLife + 1}</p>
          <p>Level : {this.props.currentLevel}</p>
        </div>
      </div>
    );
  }
}

export default SpaceInvaderComponent;
