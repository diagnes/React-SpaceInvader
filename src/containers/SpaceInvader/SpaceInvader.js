import React, { Component } from 'react';

import Actions from '../../helpers/Actions';
import Execution from '../../helpers/Execution';

import Controls from './../Controls';

//Component
import {SpaceInvaderComponent} from '../../components/SpaceInvader';

class SpaceInvader extends Component {
  constructor() {
    super();
    this.state = Execution.getGameState();
    this.size = { width: window.innerWidth, height: window.innerHeight };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.siW = window.innerWidth;
    this.siH = window.innerHeight;
    this.pressX = 0;
    this.pressY = 0;
    this.pressS = 0;
  }

  componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      Execution.addChangeListener(this.playOnChange);
      window.addEventListener('keydown', this.keydown);
      window.addEventListener('keyup', this.keyup);
      window.addEventListener('resize', this.resize);
  }

  updateWindowDimensions() {
    this.size = { width: window.innerWidth, height: window.innerHeight };
  }

  start_game = () => {
    Actions.resize_game(this.siW, this.siH);
    Actions.init_target();
    Actions.start_game();
  }

  next_level = () => {
    Actions.next_level();
    this.start_game();
  }

  restart_game = () => {
    Actions.restart_game();
  }

  quit_game = () => {
    Actions.quit_game();
  }

  surrender = () => {
    Actions.surrender();
  }

  playOnChange = () => {
    this.setState(Execution.getGameState())
  }

  resize = () => {
    this.siW = window.innerWidth;
    this.siH = window.innerHeight;
    Actions.resize_game(this.siW, this.siH);
    this.state = Execution.getGameState();
    if (this.state.start){
      Actions.restart_game();
    }
  }

  keydown = (event) => {
    let key = event.key;
    switch (key) {
      case 'ArrowUp':
        this.pressY = (-1 * this.state.playerSpeed) ;
        break;
      case 'ArrowDown':
        this.pressY = this.state.playerSpeed;
        break;
      case 'ArrowRight':
        this.pressX = this.state.playerSpeed;
        break;
      case 'ArrowLeft':
        this.pressX = (-1 * this.state.playerSpeed) ;
        break;
      case 'p':
        if (this.state.start){
          Actions.paused_game();
        }
        break;
      case ' ':
        this.pressS = 1;
        break;
      default:
        /* Pour éviter les warnings */
    }
    Actions.player_action(this.pressX, this.pressY, this.pressS);
  }

  keyup = (event) => {
    let key = event.key;
    switch (key) {
      case 'ArrowUp':
        this.pressY = 0;
        break;
      case 'ArrowDown':
        this.pressY = 0;
        break;
      case 'ArrowRight':
        this.pressX = 0;
        break;
      case 'ArrowLeft':
        this.pressX = 0;
        break;
      case ' ':
        this.pressS = 0;
        break;
      default:
        /* Pour éviter les warnings */
    }
    Actions.player_action(this.pressX, this.pressY, this.pressS);
  }

  render() {
    if (this.state.state_wl === 'y') {
       return (
         <div style={this.size} className="space-invader win">
           <h1>Bravo</h1>
           <p>Vous êtes un héros</p>
           <div className="row button-block">
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
              <a onClick={this.next_level} className="btn btn-lg">Niveau Suivant</a>
             </div>
           </div>
         </div>
       );
     }
     else if (this.state.state_wl === 'l') {
        return (
          <div style={this.size} className="space-invader loose">
            <h1>PERDU</h1>
            <p>Ooooh mon dieu mais qu'allons nous devenir pauvre de nous... S'il vous plait retenter votre chance</p>
            <div className="row button-block">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                <a onClick={this.start_game} className="btn btn-lg">Sauver le monde</a>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                <a onClick={this.surrender} className="btn btn-lg">Abandonner</a>
              </div>
            </div>
          </div>
        );
      }
      else if (this.state.start) {
        return (
          <div style={this.size} className="space-invader start">
            <SpaceInvaderComponent {...this.state} {...this.size}/>
          </div>
        );
      }
      else if (this.state.pause) {
        return (
          <div style={this.size} className="space-invader pause">
            <h1>PAUSE</h1>
            <p>Baaah alors on se la coule douce reveille toi on a un monde à sauver je te signale...</p>
            <button onClick={this.restart_game} className="btn btn-success btn-lg">Recommencer</button>
            <button onClick={this.quit_game} className="btn btn-lg">Quitter</button>
          </div>
        );
      }
      else{
        return (
          <div style={this.size} className="space-invader begin">
            <h1>Bienvenue</h1>
            <p>L'univers est en danger et il est sur le point d'être détuit aide nous !!</p>
            <div className="row controls">
              <Controls/>
            </div>
            <div className="row button-block">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                <a onClick={this.start_game} className="btn btn-lg">Sauver le monde</a>
              </div>
            </div>
          </div>
        );
      }
  }
}

export default SpaceInvader;
