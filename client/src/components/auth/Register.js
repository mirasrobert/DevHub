import React from 'react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const { name, email, password, confirm } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      console.log('Password do not match');
    } else {
      console.log('Succcess');
      /*
      const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        // Convert js object to json
        const body = JSON.stringify(newUser);

        // Make a request to the server
        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
      } catch (error) {
        console.error(error.response.data);
      }*/
    }
  };

  return (
    <Fragment>
      <section id="register" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <h1 className="text-info">Sign Up</h1>
              <p className="lead">
                <i className="fas fa-user"></i>
                Create Your Account
              </p>

              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group mb-3">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="name@example.com"
                      value={name}
                      onChange={(e) => onChange(e)}
                      required
                    />
                    <label>Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                    <label>Email address</label>
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      required
                    />
                    <label>Password</label>
                    <small id="emailHelp" className="form-text text-muted">
                      Use 8 or more characters with a mix of letters, numbers &
                      symbols
                    </small>
                  </div>

                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirm}
                      name="confirm"
                      onChange={(e) => onChange(e)}
                      placeholder="Confirm password"
                      required
                    />
                    <label>Confirm password</label>
                  </div>
                </div>

                <div className="form-group mb-2">
                  <button type="submit" className="btn btn-info px-3">
                    <i className="fas fa-sign-in-alt"></i>
                    &nbsp; Register
                  </button>
                </div>
              </form>

              <p>
                Already have account?
                <span className="text-info">
                  {' '}
                  <Link className="text-decoration-none" to="/login">
                    Sign In
                  </Link>{' '}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
