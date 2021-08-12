import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
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

  // Popuklate the fields
  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [loading]); // Run after loading

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
    createProfile(formData, history, true);
  };

  return (
    <section id="create-profile" className="pb-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="heading mb-2">
              <h1 className="text-info">Edit your profile</h1>
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
                  <label for="career" className="form-label">
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
                  <label for="company" className="form-label">
                    Company
                  </label>
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
                  <label for="company" className="form-label">
                    Your Website
                  </label>
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
                  <label for="location" className="form-label">
                    Location
                  </label>
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
                  <label for="skills" className="form-label">
                    Skills
                  </label>
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
                  <label for="github" className="form-label">
                    Github Username
                  </label>
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
                  <label for="bio" className="form-label">
                    Bio
                  </label>
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
                      <label for="twitter" className="m-0 p-0 me-3">
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
                      <label for="facebook" className="m-0 p-0 me-3">
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
                      <label for="youtube" className="m-0 p-0 me-3">
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
                      <label for="linkedin" className="m-0 p-0 me-3">
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
                      <label for="instagram" className="m-0 p-0 me-3">
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
                    <i className="fas fa-user-plus me-1"></i> Edit Profile
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
