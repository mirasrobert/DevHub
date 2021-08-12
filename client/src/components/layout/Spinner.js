import React from 'react';

const Spinner = () => {
  return (
    <div className="row min-vh-100 d-flex justify-content-center">
      <div className="col-lg-12 ">
        <div className="spinner-border spinner text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
