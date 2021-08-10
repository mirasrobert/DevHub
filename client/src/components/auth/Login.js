import { React, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('logi');
  };

  return (
    <section id="register" className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <h1 className="text-info">Sign In</h1>
            <p className="lead">
              <i className="fas fa-user"></i>
              Connect with everybody
            </p>

            <div className="alert alert-dismissible alert-danger">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <strong>
                Invaid credentials, Please check your email or password
              </strong>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group mb-3">
                <div className="form-floating has-danger mb-3">
                  <input
                    type="email"
                    className="form-control is-invalid"
                    id="email"
                    placeholder="name@example.com"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    required
                  />
                  <label>Email address</label>
                  <div className="invalid-feedback">
                    Sorry, that username's taken. Try another?
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    required
                  />
                  <label>Password</label>
                </div>
              </div>

              <div className="form-group mb-2">
                <button type="submit" className="btn btn-info px-3">
                  <i className="fas fa-sign-in-alt"></i>
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
