import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPostAction, selectPostById, updatePostAction } from '../../storage/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector(selectPostById(currentId));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      await dispatch(createPostAction(postData));
      clear();
    } else {
      await dispatch(updatePostAction(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{post ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField
          id="creator"
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData(
            { ...postData, creator: e.target.value },
          )}
        />
        <TextField
          id="title"
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData(
            { ...postData, title: e.target.value },
          )}
        />
        <TextField
          id="message"
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) => setPostData(
            { ...postData, message: e.target.value },
          )}
        />
        <TextField
          id="tags"
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData(
            { ...postData, tags: e.target.value.split(',') },
          )}
        />
        <div className={classes.fileInput}>
          <FileBase
            id="fileBase"
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

Form.propTypes = {
  currentId: PropTypes.number.isRequired,
  setCurrentId: PropTypes.any.isRequired,
};

export default Form;
