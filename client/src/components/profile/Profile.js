import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import Spinner from '../layout/Spinner';

const Profile = ({
  match,
  getSingleProfile,
  profile: { profile, loading },
  auth,
}) => {
  // Run when profile mounts
  useEffect(() => {
    getSingleProfile(match.params.id);
  }, [getSingleProfile, match.params.id]);

  const content = (
    <div className="container">
      <div className="row mt-4">
        <div className="heading col-lg-12">
          <Link to="/profiles" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Go back
          </Link>

          {auth.isAuthenticated &&
          auth.user !== null &&
          auth.user._id !== null &&
          auth.user._id == match.params.id ? (
            <Link to="/edit-profile" className="btn btn-dark ms-2">
              Edit Profile
            </Link>
          ) : null}

          <div
            className="main-profile
            row
            d-flex
            justify-content-center
            align-items-center"
          >
            <div className="col-md-12 col-sm-12 text-center my-profile">
              {profile && (
                <Fragment>
                  <ProfileTop profile={profile} />
                  <ProfileAbout profile={profile} />
                </Fragment>
              )}
            </div>

            <section id="sub-bio" className="py-3">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="semi-card-white" id="experience">
                    <h2 className="text-info fs-4">
                      Experiences <i className="fas fa-briefcase"></i>
                    </h2>
                    {profile && profile.experience.length > 0 ? (
                      <ProfileExperience experience={profile.experience} />
                    ) : (
                      <p className="fw-bold mt-2">No Experience credentials</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="semi-card-white" id="education">
                    <h2 className="text-info fs-4">
                      Education <i className="fas fa-graduation-cap"></i>
                    </h2>
                    {profile && profile.education.length > 0 ? (
                      <ProfileEducation education={profile.education} />
                    ) : (
                      <p className="fw-bold mt-2">No Education credentials</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {profile && profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
            
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      {profile === null || profile.length === 0 || loading ? (
        <Spinner />
      ) : (
        content
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getSingleProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getSingleProfile })(Profile);
