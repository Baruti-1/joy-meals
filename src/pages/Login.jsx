import React, { useState } from 'react';
import inputHelper from '../helper/inputHelper';
import { useLoginUserMutation } from '../apis/authApi';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: '',
    password: '',
  });
  const [loginUser] = useLoginUserMutation();

  const handleUserInput = (e) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });

    if (response.data) {
      localStorage.setItem('token', response.data.result.token);
    } else if (response.error) {
      console.log(response.error.data.errorMessages[0]);
      setError(response.error.data.errorMessages[0]);
    }

    setLoading(false);
  };

  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              required
              name="userName"
              value={userInput.userName}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>
        </div>

        <div className="mt-2">
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: '200px' }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
