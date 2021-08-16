import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ user: { avatar }, addPost }) => {

  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    addPost({ text });

    setText('');
  }

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
            src={avatar}
            width="40"
            height="40"
            alt="me"
          />
          <p className="px-2">Create Post</p>
        </div>

        <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="1"
            name="text"
            placeholder="What's on your mind, John Doe?"
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
          <div>
            <button className="btn btn-secondary w-100">Post</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(null, { addPost })(PostForm);
