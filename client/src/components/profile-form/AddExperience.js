import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDateDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <section id="create-profile" className="py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="heading mb-2">
              <h1 className="text-info">Add an Experience</h1>
              <p className="lead">
                <i className="fas fa-briefcase me-2"></i>
                Add any developer/programming positions that have had in the
                past
              </p>

              <small className="text-danger">* = required fields</small>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-10 col-sm-12">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <div className="form-group mb-3">
                  <label className="form-label">Job</label>
                  <input
                    type="text"
                    className="form-control"
                    id="job-title"
                    placeholder="Enter your Job Title"
                    required
                    name="title"
                    value={title}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    Could be your own company or one you work for
                  </small>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    placeholder="Enter your company"
                    name="company"
                    value={company}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    City & state suggested (eg. Boston, MA)
                  </small>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">From date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="from"
                    name="from"
                    value={from}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    When you start working
                  </small>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">To date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="to"
                    name="to"
                    value={to}
                    onChange={(e) => onChange(e)}
                    disabled={toDateDisabled ? 'disabled' : ''}
                    required
                  />
                  <small className="form-text text-muted">
                    Until you start working
                  </small>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    checked={current}
                    value={current}
                    onChange={(e) => {
                      setFormData({ ...formData, current: !current });
                      toggleDateDisabled(!toDateDisabled);
                    }}
                  />
                  <label className="form-check-label">Current working</label>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Job description</label>
                  <textarea
                    className="form-control"
                    id="bio"
                    rows="3"
                    name="description"
                    value={description}
                    onChange={(e) => onChange(e)}
                    required
                  ></textarea>
                  <small className="form-text text-muted">
                    Tell us little about your experience
                  </small>
                </div>

                <div>
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-briefcase me-1"></i> Add Experience
                  </button>
                  <Link to="/dashboard" className="btn btn-secondary">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i> Go
                    Back
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
