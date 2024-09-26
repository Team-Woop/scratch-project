import React from "react";


const Trip = props => {
  const { id, cost, origin, destination, handleRemove} = props;

  return (
    <div className="trip">
      <ul className='listItem'>
        <li className='listTripInfo'>{origin} to {destination}: {cost}</li>
        <i id={id} onClick={handleRemove} className="fas fa-trash-alt"></i>
      </ul>
    </div>
  )
}

export default Trip;