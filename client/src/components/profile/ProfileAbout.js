import React from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  const skillList = skills.map((skill, index) => {
    return (
      <li className="text-primary" key={index}>
        <i className="fas fa-check"></i> {skill}
      </li>
    );
  });

  return (
    <div className="my-bio semi-card py-3">
      {bio && (
        <Fragment>
          <h2 className="text-info fs-4">{name.split(' ')[0]}'s Bio</h2>
          <p>{bio && <span>{bio}</span>}</p>
        </Fragment>
      )}
      <div className="line"></div>
      <h2 className="text-info fs-4">Skill Set</h2>
      <div className="my-skills">
        <ul className="list-unstyled">{skillList}</ul>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
