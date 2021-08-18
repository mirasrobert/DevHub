import React from 'react';
import PropTypes from 'prop-types';

const Footer = () => {
  return (
    <footer id="footer" className="bg-dark py-3 p-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <p className="lead m-0 p-0 text-white">&copy; DevHub 2021</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
