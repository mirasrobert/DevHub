import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import PostComment from './PostComment';
import Spinner from '../layout/Spinner';
import PostSide from '../posts/PostSide';
import { getSinglePost } from '../../actions/post';

const Post = ({ getSinglePost, match, post: { post, loading } }) => {
  useEffect(() => {
    getSinglePost(match.params.postId);
  }, [getSinglePost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section id="post" className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 posts">
              <div className="card">
                {/* <div className="card-header row">
                <img height="500" src="img/post1.jpg" alt="" />
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
                          src={post.avatar}
                          width="40"
                          height="40"
                          alt="user"
                        />
                      </a>
                      <div className="name ms-3">
                        <h5 className="card-subtitle mt-2 text-info user-name">
                          {post.name.split(' ')[0]}{' '}
                          {post.name.split(' ')[1].charAt(0)}.
                        </h5>
                        <small className="post-date text-muted">
                          {moment(post.date).fromNow()}
                        </small>
                      </div>
                    </div>
                    <div className="options">
                      <a
                        href="#"
                        data-bs-container="body"
                        data-bs-toggle="popover"
                        data-bs-placement="right"
                        data-bs-html="true"
                        data-bs-content="Link: <a href='xyz.com'>XYZ</a>"
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="card-text">{post.text}</p>
                    {/* <div className="actions mt-3">
                      <a
                        onClick={(e) => addLike(post._id)}
                        className="card-link text-decoration-none m-0 pe-1"
                      >
                        <i className="far fa-thumbs-up reaction"></i>
                        <span className="px-1">
                          {post.likes.length > 0 && (
                            <span>{post.likes.length}</span>
                          )}
                        </span>
                      </a>

                      <a
                        onClick={(e) => unLike(post._id)}
                        className="card-link text-decoration-none m-0 pe-1"
                      >
                        <i className="far fa-thumbs-down reaction"></i>
                      </a>
                    </div> */}
                  </div>
                </div>

                <div className="container py-3">
                  <CommentForm postId={match.params.postId} />
                </div>

                <div>
                  {post.comments.map((comment) => (
                    <PostComment
                      key={comment._id}
                      comment={comment}
                      postId={post._id}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="col-lg-3 mt-5 mt-lg-0">
              <PostSide />
            </div> */}
          </div>  
        </div>
      </section>
    </Fragment>
  );
};

Post.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  getSinglePost,
})(Post);
