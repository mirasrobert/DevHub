import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  return (
    <div>
      {alerts != null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div className="container" key={alert.id}>
            <div className={`alert alert-dismissible alert-${alert.alertType}`}>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <span>{alert.msg}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
