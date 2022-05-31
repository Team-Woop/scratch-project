import React from 'react';
const GasContainer = require('../containers/GasContainer.jsx');


const MPGInput = props => {

    return (
        <div className="MPGInput">
            <h3>Enter your car's MPG below:</h3>
            <input id="search" type="text" value = {props.userMPG} onChange={(e)=>{props.getUserMPG(e.target.value)}} ></input>
            <h3>Enter your car's total fuel capacity below:</h3>
            <input id="totalCapacity" type="text" value = {props.totalCapacity} onChange={(e)=>{props.getTotalCapacity(e.target.value)}} ></input>
            <h3>Enter your origin below:</h3>
            <input id="origin" type="text" value = {props.origin} onChange={(e)=>{props.getUserOrigin(e.target.value)}}></input>
            <h3>Enter your destination below: </h3>
            <input id="destination" type="text" value = {props.destination} onChange={(e)=>{props.getUserDestination(e.target.value)}}></input>
        </div>
    );
};

//
export default MPGInput;