import React, { Component } from 'react';
import PropTypes from 'prop-types';

// export default class OpponentView extends Component {
//   static propTypes = {
//     opponent: PropTypes.object.isRequired
//   }
//
//   render() {
//     const { opponent } = this.props;
//
//     return (
//       <div className='player robot'>
//         <input required type='radio' id={opponent.name()} name='player' value={opponent.name()} />
//         <label className='robot-label' htmlFor={opponent.name()}>
//           <div className='name'>{opponent.name()}</div>
//           <div>Cards:{opponent.cardCount()}</div>
//           <div>Sets:{opponent.sets()}</div>
//         </label>
//       </div>
//     )
//   }
// }

const OpponentView = (props) => {
  const { opponent } = props;

  return (
    <div className='player robot'>
      <input required type='radio' id={opponent.name()} name='player' value={opponent.name()} />
      <label className='robot-label' htmlFor={opponent.name()}>
        <div className='name'>{opponent.name()}</div>
        <div>Cards:{opponent.cardCount()}</div>
        <div>Sets:{opponent.sets()}</div>
      </label>
    </div>
  );
}

export default OpponentView;
