import React from 'react';
import PropTypes from 'prop-types';

const PostForm = (props) => {
  return (
    <div className="post-form">
      <div className="card text-white bg-warning mb-3">
        <div className="
          card-header
          text-center
          d-flex
          justify-content-start
          align-items-center align-content-center">
          <img
            className="img-fluid img-round"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=40"
            alt=""
          />
          <p className="px-2">Create Post</p>
        </div>

        <div className="form-group">
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="1"
            placeholder="What's on your mind, John Doe?"
          ></textarea>
          <div>
            <button className="btn btn-secondary w-100">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {};

export default PostForm;
