import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostSide from './PostSide';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading }, auth: { user } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? <Spinner /> : <Fragment>
	  <section id="post" className="">
		<div className="container">
		<div className="row justify-content-center py-5">
          <div className="col-lg-7 posts">
  			{/* FORM */}
  			{ user !== null && (<PostForm user={user} />) }
			{/* END FORM */}

  			
			{/* MAIN POST */}
			{posts.map(post => (
				<PostItem key={post._id} post={post} />
			))}
			{/* END MAIN POST */}
		   </div>

		   {/* SIDE POSTS */}
		   {/* <div className="col-lg-3 mt-5 mt-lg-0">
				<PostSide />
		   </div> */}

		</div>	  
		</div>
	  </section>
  </Fragment>;
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);
