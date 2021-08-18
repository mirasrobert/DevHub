import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

const Toast = ({ toasts }) => {

  return (
    <Fragment>
      <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div
          className="toast align-items-center text-white border-0 show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body toast-success d-flex align-items-center align-content-center">
              <div className="toast-icon toast-icon-success">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <p className="fw-bold">Success!</p>
                <p>Your post has been added</p>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-dark me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  toasts: state.toast,
});

export default connect()(Toast);
