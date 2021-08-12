import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className="btn btn-danger"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  ));

  return (
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
            <tbody>{experiences}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
