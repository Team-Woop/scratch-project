import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/actions.js';
import NavContainer from './containers/NavContainer.jsx';
import GasContainer from './containers/GasContainer.jsx';


const mapDispatchToProps = dispatch => ({
  loadTripsToState: (trips) => dispatch(actions.loadTripsToState(trips))
})

class App extends Component{
  constructor (props){
    super(props)
  }

  //load trips to store from localstorage on page load
  componentDidMount (){
    const trips = JSON.parse(window.localStorage.getItem('trips'))
    if (trips){
      this.props.loadTripsToState(trips)
    } else {
      this.props.loadTripsToState([])
    }
  }
  render (){
    return (
  
        <div id="navContainer">
          {/* <img src="client/assets/woop.png" id='background-pic'/> */}
          {/* <NavContainer /> */}
          <GasContainer />
        </div>
        
    )
  }
}

export default connect(null ,mapDispatchToProps)(App);