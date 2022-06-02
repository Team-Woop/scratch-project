import React from "react";


const Trip = props => {
  const { id, cost, origin, destination, handleRemove} = props;

  return (
    <div className="trip">
      <ul>
        <li>{origin} to {destination}: {cost}</li>
        <i className="fas fa-trash-alt"></i>
        <button id={id} onClick={handleRemove}>Remove</button>
      </ul>
    </div>
  )
}

export default Trip;