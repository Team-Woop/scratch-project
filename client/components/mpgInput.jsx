import React from 'react';
const GasContainer = require('../containers/GasContainer.jsx');


const MPGInput = props => {

  const formContents = {}

  function handlechange(event) {
    const { value, id } = event.target;
    formContents[id] = value;
    console.log('MPGinput formContents: ', formContents)
  }

    return (
        <form className="MPGInput">
            <h3>Enter your car's MPG below:</h3>
            <input id="mpg" type="text" value = {props.userMPG} onChange={handlechange} ></input>

            <h3>Enter your car's total fuel capacity below:</h3>
            <input id="totalCapacity" type="text" value = {props.totalCapacity} onChange={handlechange} ></input>

            <h3>Enter your origin below:</h3>
            <input id="origin" type="text" value = {props.origin} onChange={handlechange}></input>

            <h3>Enter your destination below: </h3>
            <input id="destination" type="text" value = {props.destination} onChange={handlechange}></input>

            <button onClick={(event) => {
                event.preventDefault();
                props.calculateTotal(formContents)
              }}>Calculate</button>
        </form>
    );
};

//
export default MPGInput;