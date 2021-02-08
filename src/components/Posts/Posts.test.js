import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post/Post';
import Posts from './Posts';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue([{ _id: 1 }]),
}));

describe('<Posts/>', () => {
  it('should render Post', () => {
    const wrapper = shallow(<Posts setCurrentId={jest.fn()} />);
    expect(wrapper.dive().find(Post)).toBeTruthy();
  });
});
