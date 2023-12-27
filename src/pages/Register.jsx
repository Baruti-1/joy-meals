import React, { useState } from 'react';
import inputHelper from '../helper/inputHelper';
import { useRegisterUserMutation } from '../apis/authApi';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: '',
    name: '',
    password: '',
    role: '',
  });
  const [registerUser] = useRegisterUserMutation();

  const handleUserInput = (e) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await registerUser({
      userName: userInput.userName,
      name: userInput.name,
      password: userInput.password,
      role: 'customer',
    });

    if (response.data) {
      console.log(response.data);
    } else if (response.error) {
      console.log(response.error.data.errorMessages[0]);
    }

    setLoading(false);
  };

  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
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
              type="text"
              className="form-control"
              placeholder="Enter Full Name"
              required
              name="name"
              value={userInput.name}
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
        <div className="mt-5">
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;