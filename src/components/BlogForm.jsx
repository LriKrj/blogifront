import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog({
      title: title,
      author: author,
      url: url
    }));

    setTitle('');
    setAuthor('');
    setUrl('');
    blogFormRef.current.toggleVisibility();
  }

  return (
    <div>
      <h2>Create New</h2>
      <form>
        <div>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Author"
            variant="outlined"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <TextField
            label="URL"
            variant="outlined"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={addBlog}
          id='create-button'
          type="submit"
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default BlogForm;
