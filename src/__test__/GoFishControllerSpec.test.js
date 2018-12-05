import React from 'react';
import ReactDOM from 'react-dom';
import GoFishController from './../GoFishController';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GoFishController />, div);
  ReactDOM.unmountComponentAtNode(div);
});
