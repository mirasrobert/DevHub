import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

	const onSubmit = e => {
		e.preventDefault();
		addComment(postId, { text });
		setText('')
	}

  return (
    <div className="row">
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group mb-2">
          <label className="form-label mt-4">Comments:</label>
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="1"
			name="text"
			value={text}
			onChange={e => setText(e.target.value)}
            placeholder="Write a comment..."
          ></textarea>
        </div>
        <div>
          <button className="btn btn-warning">Submit</button>
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
