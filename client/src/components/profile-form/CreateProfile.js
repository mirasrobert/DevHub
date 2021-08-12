import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <section id="create-profile" className="pb-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="heading mb-2">
              <h1 className="text-info">Create your profile</h1>
              <p className="lead">
                <i className="fas fa-user"></i>
                Let's get some information to make your profile stand out
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
                  <label className="form-label">
                    Select Professional Status
                  </label>
                  <select
                    className="form-select"
                    id="career"
                    name="status"
                    value={status}
                    onChange={(e) => onChange(e)}
                  >
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                  <small id="careerHelp" className="form-text text-muted">
                    Give us an idea of where you are at in your career
                  </small>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    aria-describedby="emailHelp"
                    placeholder="Enter your company"
                    name="company"
                    value={company}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    Could be your own company or one you work for
                  </small>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Your Website</label>
                  <input
                    type="text"
                    className="form-control"
                    id="website"
                    aria-describedby="emailHelp"
                    placeholder="Enter your website"
                    name="website"
                    value={website}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    Could be your own company or one you work for
                  </small>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    aria-describedby="emailHelp"
                    placeholder="Enter your location"
                    name="location"
                    value={location}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    City & state suggested (eg. Boston, MA)
                  </small>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Skills</label>
                  <input
                    type="text"
                    className="form-control"
                    id="skills"
                    aria-describedby="emailHelp"
                    placeholder="(eg. HTML,CSS,Ruby,Java)"
                    name="skills"
                    value={skills}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    Please use comma seperated values (eg.
                    HTML,CSS,JavaScript,PHP)
                  </small>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Github Username</label>
                  <input
                    type="email"
                    className="form-control"
                    id="github"
                    aria-describedby="emailHelp"
                    placeholder="Username"
                    name="githubusername"
                    value={githubusername}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    If you want to showcase your latest repos in your profile
                  </small>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-control"
                    id="bio"
                    rows="3"
                    name="bio"
                    value={bio}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                  <small className="form-text text-muted">
                    Tell us little about yourself
                  </small>
                </div>

                <div className="form-group mb-3">
                  <a
                    onClick={() => toggleSocialInputs(!displaySocialInputs)}
                    className="btn btn-secondary me-2"
                  >
                    Add Social Network Links
                  </a>
                  <span>Optional</span>
                </div>

                {displaySocialInputs && (
                  <Fragment>
                    <div className="form-group d-flex justify-content-start mb-3">
                      <label className="m-0 p-0 me-3">
                        <i className="fab fa-twitter fa-2x"></i>
                      </label>
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          id="twitter"
                          placeholder="Twitter URL"
                          name="twitter"
                          value={twitter}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-start mb-3">
                      <label className="m-0 p-0 me-3">
                        <i className="fab fa-facebook fa-2x"></i>
                      </label>
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          id="facebook"
                          placeholder="Facebook URL"
                          name="facebook"
                          value={facebook}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-start mb-3">
                      <label className="m-0 p-0 me-3">
                        <i className="fab fa-youtube fa-2x"></i>
                      </label>
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          id="youtube"
                          placeholder="Youtube URL"
                          name="youtube"
                          value={youtube}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-start mb-3">
                      <label className="m-0 p-0 me-3">
                        <i className="fab fa-linkedin fa-2x"></i>
                      </label>
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          id="linkedin"
                          placeholder="Linkedin URL"
                          name="linkedin"
                          value={linkedin}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-start mb-4">
                      <label className="m-0 p-0 me-3">
                        <i className="fab fa-instagram fa-2x"></i>
                      </label>
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          id="instagram"
                          placeholder="Instagram URL"
                          name="instagram"
                          value={instagram}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                  </Fragment>
                )}

                <div>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-user-plus"></i> Create Profile
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
