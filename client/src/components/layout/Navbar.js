import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Fragment } from 'react';

function Navbar({ auth: { isAuthenticated, user, loading }, logout }) {
  const authLinks = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/profiles">
          Developers{' '}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/posts">
          Post
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">
          {' '}
          Dashboard{' '}
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-user"></i>
        </a>
        <div className="dropdown-menu">
          {!loading && isAuthenticated && user !== null && (
            <Link className="dropdown-item" to={`/profile/${user._id}`}>
              Profile
            </Link>
          )}
          <a onClick={logout} className="dropdown-item" href="/login">
            Logout
          </a>
        </div>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/profiles">
          Developers
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          to="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sign In
        </Link>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/login">
            Login
          </Link>
          <Link className="dropdown-item" to="/register">
            Register
          </Link>
        </div>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          <span>
            <i className="fas fa-code"></i>
          </span>{' '}
          Dev
          <span className="logo ms-1">Hub</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
