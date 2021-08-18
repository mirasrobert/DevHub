// Root Reducer
import { combineReducers } from 'redux';

import alert from './alert.js';
import auth from './auth';
import profile from './profile';
import post from './post';
import toast from './toast';

export default combineReducers({
  alert,
  toast,
  auth,
  profile,
  post,
});
