import React from 'react';
const GasContainer = require('../containers/GasContainer.jsx');

const GasButton = props => {

//   const handleChange = (event) => {
//     console.log(event.target.value);
//   }

    return (
        <div className="gasButton">
            {/* <input onChange={handleChange} type="text"></input><br></br> */}
            <button onClick={() => props.calculate()}>{props.id}</button>
            <p>{props.gallonsUsed}</p>
        </div>
    );
};

export default GasButton;