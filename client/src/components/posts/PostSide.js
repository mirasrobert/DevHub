import React from 'react';
import PropTypes from 'prop-types';

const PostSide = (props) => {
  return (
    <div className="card">
      <div className="card-header row">
        <h3 className="fw-bold fs-5">Hot topics</h3>
      </div>
      <div className="topics card-body">
        <div>
          <p className="card-text">
            <strong>#Programming</strong>
            <br />A programming language is a set of English-like instructions
            that includes a set of rules for putting the instructions together
            to create commands.
          </p>
          <a href="#" className="card-link text-decoration-none m-0 me-2">
            <i className="far fa-thumbs-up reaction has-liked"></i>12
          </a>
          <a href="#" className="card-link text-decoration-none m-0">
            <i className="far fa-thumbs-down reaction"></i>1
          </a>
        </div>

        <div>
          <p className="card-text">
            <strong>#Github</strong>
            <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            alias optio, ipsam veniam nulla impedit.
          </p>
          <a href="#" className="card-link text-decoration-none m-0 me-2">
            <i className="far fa-thumbs-up reaction has-liked"></i>12
          </a>
          <a href="#" className="card-link text-decoration-none m-0">
            <i className="far fa-thumbs-down reaction"></i>1
          </a>
        </div>

        <div>
          <p className="card-text">
            <strong>#Javascript is Good</strong>
            <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            alias optio, ipsam veniam nulla impedit.
          </p>
          <a href="#" className="card-link text-decoration-none m-0 me-2">
            <i className="far fa-thumbs-up reaction has-liked"></i>12
          </a>
          <a href="#" className="card-link text-decoration-none m-0">
            <i className="far fa-thumbs-down reaction"></i>1
          </a>
        </div>
      </div>
    </div>
  );
};

PostSide.propTypes = {};

export default PostSide;
