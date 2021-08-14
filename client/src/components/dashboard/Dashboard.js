import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile.js';

const dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section id="dashboard" className="pb-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="heading mb-2">
                <h1 className="text-info">Dashboard</h1>
                <p className="lead">
                  <i className="fas fa-user me-2"></i>
                  <span>Welcome {user && user.name}</span>
                </p>
              </div>

              {profile !== null ? (
                <Fragment>
                  <DashboardActions />
                </Fragment>
              ) : (
                <Fragment>
                  <Link to="/create-profile" className="btn btn-primary me-2">
                    Add Profile
                  </Link>
                  <p className="my-1">
                    You don't have profile yet, Please setup your profile
                  </p>
                </Fragment>
              )}
            </div>
          </div>

          {!loading && profile !== null ? (
            <Fragment>
              {/* Profile Experience Table */}
              {!loading && profile.experience !== null ? (
                <Experience experience={profile.experience} />
              ) : null}

              {/* Profile Education Table */}
              {!loading && profile.education !== null ? (
                <Education educations={profile.education} />
              ) : null}
            </Fragment>
          ) : null}

          <div className="mb-2">
            <button
              onClick={() => {
                deleteAccount();
              }}
              className="btn btn-danger"
            >
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

// Get the state
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  dashboard
);
