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
    this.props.loadTripsToState(JSON.parse(window.localStorage.getItem('trips')));
  }
  render (){
    return (
      <div id="navContainer">
          <NavContainer />
          <GasContainer />
      </div>
    )
  }
}

export default connect(null ,mapDispatchToProps)(App);