import { React, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

function Login({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState('');

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (email == '') {
      setErrors('is-invalid');
    } else if (password == '') {
      setErrors('is-invalid');
    } else {
      login(email, password);
    }
  };

  // Redirect if authenticated
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section id="register" className="pb-4 mt-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <h1 className="text-info">Sign In</h1>
            <p className="lead">
              <i className="fas fa-user"></i>
              Connect with everybody
            </p>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group mb-3">
                <div className="form-floating has-danger mb-3">
                  <input
                    type="email"
                    className={`form-control ${errors}`}
                    id="email"
                    placeholder="name@example.com"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                  <label>Email address</label>
                  <div className="invalid-feedback">
                      Email is required
                    </div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${errors}`}
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                  <label>Password</label>
                  <div className="invalid-feedback">
                      Password is required
                  </div>
                </div>
              </div>

              <div className="form-group mb-2">
                <button type="submit" className="btn btn-info px-3">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Login
                </button>
              </div>
            </form>

            <p>
              Don't have an account?
              <span className="text-info">
                {' '}
                <Link className="text-decoration-none" to="/register">
                  Sign Up
                </Link>{' '}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Login Props
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
