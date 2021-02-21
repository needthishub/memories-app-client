import React from 'react';
import { shallow } from 'enzyme';
import * as reactRedux from 'react-redux';
import Post from './Post';
import { deletePostAction, likePostAction } from '../../../storage/posts';

jest.mock('../../../storage/posts');

describe('<Post />', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const testID = 1;

  beforeEach(() => {
    useDispatchMock.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    useDispatchMock.mockClear();
  });

  it('should set post id while click on button', () => {
    const currentIdMock = jest.fn();
    const wrapper = shallow(<Post
      post={{
        selectedFile: 'testImage',
        title: 'testTitle',
        createdAt: jest.fn(),
        _id: testID,
        tags: ['testTag1', 'testTag2', 'testTag3', 'testTag4', 'testTag5'],
        message: 'testMessage',
        likeCount: '1' }}
      setCurrentId={currentIdMock}
    />);
    wrapper.dive().find('.edit-btn').props().onClick();
    expect(currentIdMock).toBeCalledWith(testID);
  });

  it('should like post while click on button', () => {
    const wrapper = shallow(<Post
      post={{
        selectedFile: 'testImage',
        title: 'testTitle',
        createdAt: jest.fn(),
        _id: testID,
        tags: ['testTag1', 'testTag2', 'testTag3', 'testTag4', 'testTag5'],
        message: 'testMessage',
        likeCount: '1' }}
      setCurrentId={jest.fn()}
    />);
    wrapper.find('.like-btn').props().onClick();
    expect(likePostAction).toBeCalledWith(testID);
  });

  it('should delete post while click on button', () => {
    const wrapper = shallow(<Post
      post={{
        selectedFile: 'testImage',
        title: 'testTitle',
        createdAt: jest.fn(),
        _id: testID,
        tags: ['testTag1', 'testTag2', 'testTag3', 'testTag4', 'testTag5'],
        message: 'testMessage',
        likeCount: '1' }}
      setCurrentId={jest.fn()}
    />);
    wrapper.find('.delete-btn').props().onClick();
    expect(deletePostAction).toBeCalledWith(testID);
  });

  it('should match to snapshot', () => {
    const wrapper = shallow(<Post
      post={{
        selectedFile: 'testImage',
        title: 'testTitle',
        createdAt: jest.fn(),
        _id: testID,
        tags: ['testTag1', 'testTag2', 'testTag3', 'testTag4', 'testTag5'],
        message: 'testMessage',
        likeCount: '1' }}
      setCurrentId={jest.fn()}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
