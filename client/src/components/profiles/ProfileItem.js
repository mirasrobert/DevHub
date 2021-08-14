import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile">
      <div className="dp">
        <img className="img-fluid img-round" src={avatar} alt={name} />
      </div>
      <div className="info">
        <h2 className="m-0 p-0 fs-4">{name}</h2>
        <p className="m-0 p-0">{status}</p>
        <p className="m-0 p-0">{location}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary my-3">
          View Profile
        </Link>
      </div>
      <div className="skills">
        <ul className="list-unstyled">
          {skills.length > 0 &&
            skills.slice(0, 4).map((skill, index) => (
              <li className="text-primary" key={index}>
                <i className="fas fa-check"></i> {skill}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;
