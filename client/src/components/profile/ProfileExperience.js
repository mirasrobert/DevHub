import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
  return experience.map((exp) => (
    <div className="mb-3" key={exp._id}>
      <h3>{exp.company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          'Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong> {exp.title && <span>{exp.title}</span>}
      </p>
      <p>
        <strong>Description: </strong>{' '}
        {exp.description && <span>{exp.description}</span>}
      </p>
    </div>
  ));
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
