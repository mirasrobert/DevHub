import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const [toDateDisabled, toggleDateDisabled] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <section id="create-profile" class="pb-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="heading mb-2">
              <h1 className="text-info">Add Your Education</h1>
              <p className="lead">
                <i className="fas fa-graduation-cap me-2"></i>
                Add your academic experience
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
                  <label className="form-label">School</label>
                  <input
                    type="text"
                    className="form-control"
                    id="School"
                    placeholder="Enter your school or bootcamp"
                    name="school"
                    value={school}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    School or bootcamp that you've attended
                  </small>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Degree or certificate</label>
                  <input
                    type="text"
                    className="form-control"
                    id="degree"
                    placeholder="Enter your degree"
                    name="degree"
                    value={degree}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    (eg. Masters, Bacherlors)
                  </small>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Field of Study</label>
                  <input
                    type="text"
                    className="form-control"
                    id="field-of-study"
                    placeholder="Enter your field of study"
                    name="fieldofstudy"
                    value={fieldofstudy}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    (eg. Masters, Bacherlors)
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
                    When you start attending
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
                    Last date of your school calendar or bootcamp
                  </small>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={current}
                    onChange={(e) => {
                      setFormData({ ...formData, current: !current });
                      toggleDateDisabled(!toDateDisabled);
                    }}
                  />
                  <label className="form-check-label">
                    Currently in school
                  </label>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Program description</label>
                  <textarea
                    className="form-control"
                    id="description"
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
                    <i className="fas fa-briefcase me-1"></i> Add Education
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
