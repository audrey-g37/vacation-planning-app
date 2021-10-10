import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleInputChange = (event) =>{
    event.preventDefault()
    const {name,value} = event.target;

    if (name==="username"){
      setUsername(value)
    }else if (name === "password"){
      setPassword(value)
    }
  }

  // const [addUser, {error}] = useMutation(ADD_USER)


  // const [formState, setFormState] = useState({
  //   username: '',
  //   password: '',
  // });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // // update state based on form input changes
  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
       await addUser({
        variables: { 
          username: username,
          password:password
        },
      }).then((data)=>{
        setUsername("")
        setPassword("")
        console.log(data)
      });
      
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <body className="body">
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleInputChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    </body>
  );
};

export default Signup;