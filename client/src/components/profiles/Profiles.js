import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from '../profiles/ProfileItem';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  const content = (
    <section id="profiles">
      <div className="container">
        <div className="row">
          <div className="heading col-lg-12">
            <h1 className="text-info">Developers</h1>
            <p className="lead">
              <i className="far fa-square"></i> Browse and connect with
              developers
            </p>
          </div>

          <div className="main-content">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h5>No Profiles Found</h5>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Fragment>
      {loading || profiles.length === 0 ? <Spinner /> : content}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
