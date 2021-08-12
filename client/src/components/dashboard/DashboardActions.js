import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="buttons">
      <Link to="/edit-profile" className="btn btn-secondary me-2">
        <i className="fas fa-user-edit text-info"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-secondary me-2">
        <i className="fas fa-info-circle text-info"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-secondary me-2">
        <i className="fas fa-user-graduate text-info"></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
