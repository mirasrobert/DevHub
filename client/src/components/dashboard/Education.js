import React from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';
import { connect } from 'react-redux';

const Education = ({ educations, deleteEducation }) => {
  const education = educations.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={(e) => {
            deleteEducation(edu._id);
          }}
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
          <h2 className="text-info fs-5">Education Credentials</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-10 col-sm-12">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">School</th>
                <th scope="col">Degree</th>
                <th scope="col">Years</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{education}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

Education.propTypes = {
  educations: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
