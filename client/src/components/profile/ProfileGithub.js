import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';
import axios from 'axios';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {

  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  const githubRepos = (
  repos.map(repo => (
	<div className="repo semi-card-white mb-3" key={repo.id}>
	<div>
	  <h5>
		<a href={repo.html_url} className="text-decoration-none" target="_blank">
		  { repo.name }
		</a>
	  </h5>
	  <p>
		{ repo.description }
	  </p>
	</div>
  
	<div>
	  <ul className="list-unstyled">
		<li className="badge bg-primary me-2">Stars: { repo.stargazers_count }</li>
		<li className="badge bg-dark me-2">Watchers: { repo.watchers_count }</li>
		<li className="badge bg-light me-2">Forks: { repo.forks_count }</li>
	  </ul>
	</div>
  </div>
  ))
);

  return (
    <section id="github" className="py-3">
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-info fs-4">
            <div className="fab fa-github"></div>
            GitHub Repos
          </h2>

          { repos === null && repos && repos.length > 0 ? <Spinner /> :  githubRepos}
	
        </div>
      </div>
    </section>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
