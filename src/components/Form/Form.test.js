import React, { useState as useStateMock } from 'react';
import { shallow } from 'enzyme';
import { createPostAction, selectPostById, updatePostAction } from '../../storage/posts';
import Form from './Form';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: (f) => f(),
  useDispatch: () => jest.fn(),
}));

jest.mock('../../storage/posts');

describe('<Form />', () => {
  const setPostDataMock = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setPostDataMock]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create post', async () => {
    const eventMock = { preventDefault: jest.fn() };
    selectPostById.mockImplementation(() => () => ({}));
    // jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    const wrapper = shallow(<Form currentId={0} setCurrentId={jest.fn()} />);
    await wrapper.dive().find('form').props().onSubmit(eventMock);
    expect(createPostAction).toBeCalled();
  });

  it('should update post', async () => {
    const eventMock = { preventDefault: jest.fn() };
    selectPostById.mockImplementation(() => () => ({}));
    const wrapper = shallow(<Form currentId={1} setCurrentId={jest.fn()} />);
    await wrapper.dive().find('form').props().onSubmit(eventMock);
    expect(updatePostAction).toBeCalled();
  });

  it('should effect set post data when select post', () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    selectPostById.mockImplementationOnce(() => () => null);
    const wrapper = shallow(<Form currentId={1} setCurrentId={jest.fn()} />);
    const postDataMock = { creator: '', title: 'NewTitle', message: 'testMessage', tags: '', selectedFile: '' };
    selectPostById.mockImplementationOnce(() => () => (postDataMock));
    wrapper.rerender({ currentId: 0, setCurrentId: jest.fn() });
    expect(setPostDataMock).toBeCalledWith(postDataMock);
  });

  it('should change creator text field value', () => {
    const eventMock = { preventDefault() {}, target: { value: 'testCreator' } };
    const postDataMock = { creator: 'testCreator', title: '', message: '', tags: '', selectedFile: '' };
    const wrapper = shallow(<Form currentId={0} setCurrentId={jest.fn()} />);
    wrapper.dive().find('#creator').props().onChange(eventMock);
    expect(setPostDataMock).toBeCalledWith(postDataMock);
  });

  it('should change title text field value', () => {
    const eventMock = { preventDefault() {}, target: { value: 'testTitle' } };
    const postDataMock = { creator: '', title: 'testTitle', message: '', tags: '', selectedFile: '' };
    const wrapper = shallow(<Form currentId={0} setCurrentId={jest.fn()} />);
    wrapper.dive().find('#title').props().onChange(eventMock);
    expect(setPostDataMock).toBeCalledWith(postDataMock);
  });

  it('should change message text field value', () => {
    const eventMock = { preventDefault() {}, target: { value: 'testMessage' } };
    const postDataMock = { creator: '', title: '', message: 'testMessage', tags: '', selectedFile: '' };
    const wrapper = shallow(<Form currentId={0} setCurrentId={jest.fn()} />);
    wrapper.dive().find('#message').props().onChange(eventMock);
    expect(setPostDataMock).toBeCalledWith(postDataMock);
  });

  it('should change tags text field value', () => {
    const eventMock = { preventDefault() {}, target: { value: 'testTags' } };
    const postDataMock = { creator: '', title: '', message: '', tags: ['testTags'], selectedFile: '' };
    const wrapper = shallow(<Form currentId={0} setCurrentId={jest.fn()} />);
    wrapper.dive().find('#tags').props().onChange(eventMock);
    expect(setPostDataMock).toBeCalledWith(postDataMock);
  });

  it('should select file onDone', () => {
    const base64Mock = { base64: 'testJPG' };
    const postDataMock = { creator: '', title: '', message: '', tags: '', selectedFile: 'testJPG' };
    const wrapper = shallow(<Form currentId={0} setCurrentId={jest.fn()} />);
    wrapper.dive().find('#fileBase').props().onDone(base64Mock);
    expect(setPostDataMock).toBeCalledWith(postDataMock);
  });
});
