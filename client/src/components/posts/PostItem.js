import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Moment } from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { addLike, unLike, deletePost } from '../../actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  addLike,
  unLike,
  deletePost,
}) => {
  return (
    <div className="card">
      {/* <div className="card-header row">
        <img
          height="500"
          src="https://images.pexels.com/photos/7191989/pexels-photo-7191989.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />
      </div> */}

      <div
        className="
            card-body
            row
            g-0
            justify-content-center
            align-items-center"
      >
        <div className="d-flex justify-content-between">
          <div
            className="
              user-header
              text-sm-start
              d-flex
              align-items-start align-content-center
              my-2"
          >
            <a href="#">
              <img
                className="img-fluid img-round"
                src={avatar}
                width="40"
                height="40"
                alt="user"
              />
            </a>
            <div className="name ms-3">
              <h5 className="card-subtitle mt-2 text-info user-name">
                {name.split(' ')[0]} {name.split(' ')[1].charAt(0)}.
              </h5>
              <small className="post-date text-muted">
                {moment(date).fromNow()}
              </small>
            </div>
          </div>
          {/* CHECK IF AUTHENTICATED USER OWNS THE POST */}
          { !auth.loading && auth.user._id === user &&  (
            <div className="dropdown">
            <a className="text-decoration-none" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-ellipsis-v"></i>
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><Link className="dropdown-item" target="_blank" to={`/post/${_id}`}>Open Discussion</Link></li>
              <li><a onClick={(e) => deletePost(_id)} className="dropdown-item" type="button">Delete</a></li>
            </ul>
            </div>
          ) }
        </div>
        <div>
          <p className="card-text">{text}</p>
          <div className="actions mt-3">
            <a
              onClick={(e) => addLike(_id)}
              className="card-link text-decoration-none m-0 pe-1"
            >
              <i className="far fa-thumbs-up reaction"></i>
              <span className="px-1">
                {likes.length > 0 && <span>{likes.length}</span>}
              </span>
            </a>

            <a
              onClick={(e) => unLike(_id)}
              className="card-link text-decoration-none m-0 pe-1"
            >
              <i className="far fa-thumbs-down reaction"></i>
            </a>

            <a className="card-link text-decoration-none m-0 pe-1">
              <i className="far fa-comments reaction"></i>
              <span className="px-1">
                {comments.length > 0 && <span>{comments.length}</span>}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, unLike, deletePost })(
  PostItem
);
