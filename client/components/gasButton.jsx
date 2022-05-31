import React from 'react';
const GasContainer = require('../containers/GasContainer.jsx');
const results = require('./results.jsx');

const GasButton = props => {

    return (
        <div className="gasButton">
            <button onClick={
                () => {
                    props.calculate(props.userMPG)
                    props.getOrigin(props.origin)
                    props.getDestination(props.destination)
                    props.getTotalCapacity(props.totalCapacity)
                }

            }>{props.id}</button>
        </div>
    );
};

export default GasButton;