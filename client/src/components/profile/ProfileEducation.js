import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education }) => {
  return education.map((edu) => (
    <div className="mb-3" key={edu._id}>
      <h3>{edu.school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong> {edu.degree}
      </p>
      <p>
        <strong>Field of study: </strong> {edu.fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {edu.description}
      </p>
    </div>
  ));
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
