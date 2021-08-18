import React from 'react';
import NotFoundSvg from '../../img/404.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section id="404">
      <div className="container">
        <div
          className="
            row
            justify-content-center
            align-items-center align-content-center
          "
        >
          <div className="col-lg-8 col-sm-12 justify-content-center py-5">
            <img className="img-fluid" src={NotFoundSvg} alt="404" />
            <div className="text-center">
              <h3 className="text-center text-muted">
                Sorry, but we cannot find what you're looking for.
              </h3>
              <Link
                className="text-center text-decoration-none fw-bold"
                to="/posts"
              >
                Go back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
