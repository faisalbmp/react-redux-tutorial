
// import index from "./js/index";
import React, {Fragment} from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';
import Dashboard from "../Dashboard";
import Login from "../Login/Login";
import store from "../../../config/redux/store";
import Add from "../Add";
import Show from "../Show";
import Edit from "../Edit";

function App(){
  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="navigation">
            <Link to='/'>HOME</Link>
          </div>
          <div>
              <Route exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
                <Route path='/add' component={Add} />
                <Route path='/show/:name' component={Show} />
                <Route path='/edit' component={Edit} />
          </div>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;