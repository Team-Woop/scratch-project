import React from 'react';
const GasContainer = require('../containers/GasContainer.jsx');

const GasButton = props => {

    return (
        <div className="gasButton">
            <button onClick={() => console.log(props.calculate())}>{props.id}</button>
        </div>
    );
};

export default GasButton;