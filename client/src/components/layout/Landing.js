import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <section id="landing">
      <div className="bg-overlay">
        <div className="container">
          <div
            className="
              row
              min-vh-100
              justify-content-center
              align-content-center align-items-center
              landing-inner
            "
          >
            <div className="col-lg-12 d-block mx-auto landing-text">
              <h1 className="text-white fs-2 mb-3">
                Developer <span className="logo">Hub</span>
              </h1>
              <p>
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <div className="action mt-3">
                <Link to="/register" className="btn btn-primary me-3">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
