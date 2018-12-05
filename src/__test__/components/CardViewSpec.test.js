import React from 'react';
import CardView from '../../components/CardView';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fixtures } from '../TestHelper';

Enzyme.configure({ adapter: new Adapter() });

describe('CardView', () => {
  let wrapper;
  const card = fixtures.aceSpade,
        handleClick = jest.fn();
        
  const shallowView = () => {
    return shallow(<CardView card={card} selectedCard={null} handleClick={handleClick}/>);
  };

  describe('clicking on a card', () => {
    wrapper = shallowView();

    it('calls onCardClick with the card object', () => {
      wrapper.find('.card').first().simulate('click')
      expect(handleClick).toBeCalledWith(card)
    });
  });
})
