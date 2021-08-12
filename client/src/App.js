import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './css/bootstrap.min.css';
import './App.css';

if (localStorage.token) { 
  setAuthToken(localStorage.token);
}

const App = () => {
  // Run Once
  useEffect(() => {
    console.log('Use effect is working');
    store.dispatch(loadUser());
  }, []);


  return (
    <Provider store={store}>    
      <Router>
        <Fragment>
          <Navbar />

          {/* IF URL IS IN path = '/' then Render the component = <component> */}
          <Route exact path="/" component={Landing} />
          <div className="py-3">
            <Alert />
          </div>
          <div>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
