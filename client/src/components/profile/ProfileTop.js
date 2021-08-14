import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="heading bg-info py-3">
      <div className="dp mb-3">
        <img className="img-fluid img-round" src={avatar} alt={name} />
      </div>
      <div className="my-info mb-3">
        <h2 className="m-0 p-0 mb-2 fs-1 text-white">{name}</h2>
        <p className="m-0 p-0 mb-2">
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="m-0 p-0">{location && <span>{location}</span>}</p>
      </div>
      <div className="social">
        <ul className="list-unstyled">
          {website && (
            <li className="text-white">
              <a href={website} target="_blank">
                <i className="fas fa-globe fa-2x"></i>{' '}
              </a>
            </li>
          )}

          {social && social.twitter && (
            <li className="text-white">
              <a href={social.twitter} target="_blank">
                <i className="fab fa-twitter fa-2x"></i>{' '}
              </a>
            </li>
          )}

          {social && social.facebook && (
            <li className="text-white">
              <a href={social.facebook} target="_blank">
                <i className="fab fa-facebook fa-2x"></i>{' '}
              </a>
            </li>
          )}

          {social && social.linkedin && (
            <li className="text-white">
              <a href={social.linkedin} target="_blank">
                <i className="fab fa-linkedin fa-2x"></i>{' '}
              </a>
            </li>
          )}

          {social && social.instagram && (
            <li className="text-white">
              <a href={social.instagram} target="_blank">
                <i className="fab fa-instagram fa-2x"></i>{' '}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
