import React from 'react';
const GasContainer = require('../containers/GasContainer.jsx');


const MPGInput = props => {

  const formContents = {};

  function handlechange(event) {
    const { value, id } = event.target;
    formContents[id] = value;
    //console.log('MPGinput formContents: ', formContents)
  }

    return (
        <form className="MPGInput">
            <h3>Enter your car's MPG below:</h3>
            <input id="mpg" className='formInput' type="text" placeholder='MPG' value = {props.userMPG} onChange={handlechange} ></input>

            <h3>Enter your car's total fuel capacity below:</h3>
            <input id="totalCapacity" className='formInput' type="text" placeholder={'Fuel capacity'} value = {props.totalCapacity} onChange={handlechange} ></input>

            <h3>Enter your origin below:</h3>
            <input id="originCity" className='formInput' type="text" placeholder={'City'} value={props.originCity} onChange={handlechange}></input>
            <input id="originState" className='formInput' type="text" placeholder={'State'} value={props.originState} onChange={handlechange}></input>

            <h3>Enter your destination below: </h3>
            <input id="destinationCity" className='formInput' type="text" placeholder={'City'} value={props.destinationCity} onChange={handlechange}></input>
            <input id="destinationState" className='formInput' type="text" placeholder={'State'} value={props.destinationState} onChange={handlechange}></input>
            <br/>
            <br/>
            <button id="btn" onClick={(event) => {
                event.preventDefault();
                props.calculateTotal(formContents);
                const elements = document.querySelectorAll('.formInput');
                elements.forEach(el => {
                  el.value = '';
                })
              }}>Calculate</button>
        </form>
    );
};

//
export default MPGInput;