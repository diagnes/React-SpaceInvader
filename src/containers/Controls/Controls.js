import React, { Component } from 'react';

//Images
import up from './public/img/computer_key_up.png';
import down from './public/img/computer_key_down.png';
import right from './public/img/computer_key_right.png';
import left from './public/img/computer_key_left.png';
import shoot from './public/img/computer_key_space.png';
import pause from './public/img/computer_key_p.png';

//Constante
import {controls} from '../../constant'

//Component
import ControlComponent from '../../components/ControlComponent';

const images = {
  up : up,
  down : down,
  right : right,
  left :  left,
  shoot :  shoot,
  pause : pause,
};

class Controls extends Component {
  render() {
    return (
      <div className="control">
        {controls.map((control, index) =>(
          <ControlComponent
          key={index}
          controlName={control.controlName}
          controlDesription={control.controlDesription}
          controlLogo={images[control.controlLogo]}
          controlLogoText={control.controlLogo}
          />
        ))}
      </div>
    );
  }
}

export default Controls;
