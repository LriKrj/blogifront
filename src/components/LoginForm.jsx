import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import Alert from 'react-bootstrap/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginForm = () => {
  const notification = useSelector((state) => state.notification.value);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username: username, password: password }));

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
      {notification && <Alert variant="danger">{notification}</Alert>}
      <form>
        <div>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={login}
          id='login-button'
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
