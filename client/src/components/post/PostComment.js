import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';

const PostComment = ({
  comment: { _id, text, name, avatar, user, date },
  postId,
  auth,
  deleteComment,
}) => {
  return (
    <div class="card-body row g-0 justify-content-center align-items-center p-3">
      <div class="col-2 text-center">
        <Link to={`/profile/${user}`}>
          <img
            class="img-fluid img-round"
            src={avatar}
            alt="user"
            width="30"
            height="40"
          />
        </Link>
        <h5 class="card-subtitle mt-2 text-info user-name">
          {name.split(' ')[0]} {name.split(' ')[1].charAt(0)}.
        </h5>
      </div>
      <div class="col-lg-10">
        <p class="card-text">{text}</p>
        <div class="actions d-flex justify-content-start mt-2">
          { !auth.loading && user === auth.user._id && (
            <Fragment>
              <a
            href="#"
            class="comment-action card-link text-decoration-none m-0 pe-2"
          >
            Edit
          </a>
          <a
            href="#"
            class="comment-action card-link text-decoration-none m-0 pe-2"
          >
            Reply
          </a>
          <a
            onClick={(e) => deleteComment(postId, _id)} type="button"
            class="comment-action card-link text-decoration-none m-0 pe-2">
              Remove
          </a>
            </Fragment>
          )}
          
          <small class="text-muted">{moment(date).fromNow()}</small>
        </div>
      </div>
    </div>
  );
};

PostComment.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(PostComment);
