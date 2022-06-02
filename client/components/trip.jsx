import { connect } from 'react-redux';
import React from "react";
import * as actions from '../actions/actions.js';

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  removeTrip: () => dispatch(actions.removeTrip())
})

const Trip = props => {
  const { id, cost, origin, destination } = props;

  return (
    <div className="trip">
      <ul>
        <li>{origin} to {destination}: {cost}</li>
        <i className="fas fa-trash-alt"></i>
        <button id={id} onClick={(event) => {
            event.preventDefault();
            const trips = Object.assign({}, window.localStorage.getItem('trips'));
            window.localStorage.setItem()
          }}>
          remove trip
        </button>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Trip);