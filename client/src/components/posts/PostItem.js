import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Moment } from 'react-moment';
import { connect } from 'react-redux';
import { addLike, unLike } from '../../actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  addLike, unLike
}) => {
  return (
    <div className="card">
      <div className="card-header row">
        <img
          height="500"
          src="https://images.pexels.com/photos/7191989/pexels-photo-7191989.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />
      </div>
      <div className="card-body row g-0 justify-content-center align-items-center">
        <div className="col-2 text-center">
          <a href="#">
            <img
              className="img-fluid img-round"
              width="40"
              height="40"
              src={avatar}
              alt="user"
            />
          </a>
          <h5 className="card-subtitle mt-2 text-info user-name">
            {name.split(' ')[0]} {name.split(' ')[1].charAt(0)}.
          </h5>
        </div>
        <div className="col-lg-10">
          <p className="card-text">{text}</p>
          <a onClick={(e) => addLike(_id)} className="card-link text-decoration-none m-0">
            <i className="far fa-thumbs-up reaction"></i>
            <span className="px-1">{likes.length > 0 && <span>{ likes.length }</span> }</span>
          </a>
          <a onClick={(e) => unLike(_id)} className="card-link text-decoration-none m-0">
          <i className="far fa-thumbs-down reaction"></i>
            <span className="px-1">{comments.length > 0 && <span>{ comments.length }</span> }</span>
          </a>
          <a className="card-link text-decoration-none m-0">
            <i className="far fa-comments reaction"></i>
            <span className="px-1">{comments.length > 0 && <span>{ comments.length }</span> }</span>
          </a>
          <Link to={`/post/${_id}`} target='_blank' className="m-0 btn btn-info btn-sm ms-3">
            Open Discussion
          </Link>
		  {/* CHECK IF AUTHENTICATED USER OWNS THE POST */}
          {!auth.loading && auth.user._id === user && (
            <a href="#" className="m-0 btn btn-danger btn-sm ms-2">
              <i className="far fa-trash-alt"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, unLike })(PostItem);
