import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile.js';

const dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

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

              {!loading && profile !== null ? (
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
              <div className="row">
                <div className="col-lg-12">
                  <h2 className="text-info fs-5">Experience Credentials</h2>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-10 col-sm-12">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Company</th>
                        <th scope="col">Title</th>
                        <th scope="col">Years</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Microsoft</td>
                        <td>Senior developer</td>
                        <td>Oct 2011 - Current</td>
                        <td>
                          <button className="btn btn-danger">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <h2 className="text-info fs-5">Education Credentials</h2>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-10 col-sm-12">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">School</th>
                        <th scope="col">Degree</th>
                        <th scope="col">Years</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>University of Washington</td>
                        <td>Bachelor's</td>
                        <td>Sept 1993 - June 1999</td>
                        <td>
                          <button className="btn btn-danger">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Fragment>
          ) : null}

          <div className="mb-2">
            <button className="btn btn-danger">
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
};

// Get the state
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(dashboard);
