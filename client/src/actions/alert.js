// Action for alert
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './constant';

// Action name = setAlert
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();

  // Call the SET ALERT on switch statement on reducer
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id,
    },
  });
};
