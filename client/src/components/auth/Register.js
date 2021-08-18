import React from 'react';
import { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import axios from 'axios';

//import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated, setToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [errors, setErrors] = useState('');

  const { name, email, password, confirm } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Test Call Server
  const callServer = async (e) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;

    console.log(token);

    const headers = {
      Authorization: token,
    };

    const res = await axios.get('/api/auth', { headers });

    console.log(res.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirm) {
      setErrors('is-invalid');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <section id="register" className="pb-4">
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
                      className={`form-control`}
                      id="name"
                      name="name"
                      placeholder="name@example.com"
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                    <label>Name</label>
                    <div className="invalid-feedback">
                      Name is required
                    </div>
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
                    />
                    <label>Email address</label>
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-floating mb-3 has-danger">
                    <input
                      type="password"
                      className={`form-control ${errors}`}
                      id="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
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
                      className={`form-control ${errors}`}
                      id="confirmPassword"
                      value={confirm}
                      name="confirm"
                      onChange={(e) => onChange(e)}
                      placeholder="Confirm password"
                    />
                    <label>Confirm password</label>

                    <div className="invalid-feedback">
                      Password does not match
                    </div>
                  </div>
                </div>

                <div className="form-group mb-2">
                  <button type="submit" className="btn btn-info px-3">
                    <i className="fas fa-sign-in-alt"></i>
                    &nbsp; Register
                  </button>
                </div>
              </form>

              {/* <button onClick={(e) => callServer(e)}>Test Axios</button> */}

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
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
