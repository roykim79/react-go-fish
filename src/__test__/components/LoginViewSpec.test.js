import React from 'react';
import LoginView from '../../components/LoginView';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('LoginView', () => {
  let wrapper;
  const onLogin = jest.fn();
  const shallowView = () => shallow(<LoginView onLogin={onLogin}/>);

  describe('form submit', () => {
    wrapper = shallowView();

    it('calls passed in function with logged in player name and bot count', () => {
      wrapper.find('#name').simulate('change', {target: { value: 'Roy'}, persist: jest.fn()});
      wrapper.find('#bot_count').simulate('change', {target: { value: '2'}, persist: jest.fn()});
      wrapper.find('#login-form').simulate('submit', {preventDefault: jest.fn()});

      expect(onLogin).toBeCalledWith('Roy', 2);
    })
  })
})
