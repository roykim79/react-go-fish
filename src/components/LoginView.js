import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginView extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  onSubmit = (e) => {
    const { name, botCount } = this.state;
    e.preventDefault();
    this.props.onLogin(name, Number(botCount));
  }

  updateName = (e) => {
    e.persist();
    this.setState(() => ({name: e.target.value}));
  }

  updateBotCount = (e) => {
    e.persist();
    this.setState(() => ({botCount: e.target.value}));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className='user-form' id='login-form' >
        <label htmlFor='name'>Name</label>
        <input onChange={this.updateName} type='text' id='name' />
        <label htmlFor='bot_count'> Number of Bots </label>
        <input onChange={this.updateBotCount} type='number' id='bot_count' />
        <input id='submit' type='submit' value='Login' />
      </form>
    );
  };
};
