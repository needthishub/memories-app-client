import { createStorage } from './index';
import * as api from '../api';
import {
  createPostAction, deletePostAction,
  fetchPostsAction,
  likePostAction,
  selectError,
  selectPostById,
  updatePostAction,
} from './posts';

describe('posts', () => {
  /*     1 create store
         2 mock api call
         3 dispatch action
         4 check result in store
        */
  it('should fetchPostsAction resolve', async () => {
    const _id = 1;
    const post = { _id };
    const store = createStorage();
    jest.spyOn(api, 'fetchPosts').mockResolvedValue({ data: [post] });
    await store.dispatch(fetchPostsAction());
    const resultPost = selectPostById(_id)(store.getState());
    expect(resultPost).toBe(post);
  });

  it('should fetchPostsAction reject', async () => {
    const error = { message: 'testError! fetchPostsAction' };
    const store = createStorage();
    jest.spyOn(api, 'fetchPosts').mockRejectedValue(error);
    await store.dispatch(fetchPostsAction());
    const resultPost = selectError(store.getState());
    expect(resultPost).toBe(error.message);
  });

  it('should createPostAction resolve', async () => {
    const _id = 2;
    const post = { _id };
    const store = createStorage();
    jest.spyOn(api, 'createPost').mockResolvedValue({ data: post });
    await store.dispatch(createPostAction(post));
    const resultPost = selectPostById(_id)(store.getState());
    expect(resultPost).toBe(post);
  });

  it('should createPostAction reject', async () => {
    const error = { message: 'testError! createPostAction' };
    const store = createStorage();
    jest.spyOn(api, 'createPost').mockRejectedValue(error);
    await store.dispatch(createPostAction());
    const resultPost = selectError(store.getState());
    expect(resultPost).toBe(error.message);
  });

  it('should updatePostAction by id', async () => {
    const _id = 3;
    const post = { _id, message: 'newPost' };
    const store = createStorage({ posts: { list: [{ _id }] } });
    jest.spyOn(api, 'updatePost').mockResolvedValue({ data: post });
    await store.dispatch(updatePostAction(_id, post));
    const resultPost = selectPostById(_id)(store.getState());
    expect(resultPost).toBe(post);
  });

  it('should updatePostAction reject', async () => {
    const error = { message: 'testError! updatePostAction' };
    const store = createStorage();
    jest.spyOn(api, 'updatePost').mockRejectedValue(error);
    await store.dispatch(updatePostAction());
    const resultPost = selectError(store.getState());
    expect(resultPost).toBe(error.message);
  });

  it('should likePostAction resolve', async () => {
    const _id = 4;
    const post = { _id, likeCount: 1 };
    const store = createStorage({ posts: { list: [{ _id }] } });
    jest.spyOn(api, 'likePost').mockResolvedValue({ data: post });
    await store.dispatch(likePostAction(_id));
    const resultPost = selectPostById(_id)(store.getState());
    expect(resultPost).toBe(post);
  });

  it('should likePostAction reject', async () => {
    const error = { message: 'testError! likePostAction' };
    const store = createStorage();
    jest.spyOn(api, 'likePost').mockRejectedValue(error);
    await store.dispatch(likePostAction());
    const resultPost = selectError(store.getState());
    expect(resultPost).toBe(error.message);
  });

  it('should deletePostAction resolve', async () => {
    const id = 6;
    const post = { _id: 5 };
    const store = createStorage({ posts: { list: [post] } });
    jest.spyOn(api, 'deletePost').mockResolvedValue(id);
    await store.dispatch(deletePostAction(id));
    const resultPost = selectPostById(post._id)(store.getState());
    expect(resultPost).toBe(post);
  });

  it('should deletePostAction reject', async () => {
    const error = { message: 'testError! deletePostAction' };
    const store = createStorage();
    jest.spyOn(api, 'deletePost').mockRejectedValue(error);
    await store.dispatch(deletePostAction());
    const resultPost = selectError(store.getState());
    expect(resultPost).toBe(error.message);
  });
});

