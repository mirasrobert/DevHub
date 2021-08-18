// Action for alert
import { v4 as uuidv4 } from 'uuid';
import { SET_TOAST, REMOVE_TOAST } from './constant';

// Action name = setAlert
export const setToast = (msg, alertType, icon) => (dispatch) => {
  const id = uuidv4();

  // Call the SET ALERT on switch statement on reducer
  dispatch({
    type: SET_TOAST,
    payload: {
      msg,
      alertType,
      icon,
      id,
    },
  });

  setTimeout(() => dispatch({ type: REMOVE_TOAST, payload: id}), 4000);
};
