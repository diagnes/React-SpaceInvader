import React from 'react';

const ControlComponent = props => (
    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 m-t-20">
      <p>{props.controlName}</p>
      <img src={props.controlLogo} alt={"Keyboard " + props.controlLogoText} />
    </div>
)

export default ControlComponent
