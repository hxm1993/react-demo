import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { mainRouter } from "./routes"
import store from "./store"
import { Provider } from "react-redux"
import Dashboard from "./views/Dashboard"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {/* <Route path="/dashboard" render={props => {
            console.log(111,props)
            return <Dashboard />
        }} />
        <Route path="/dashboard/1" component={Dashboard} /> */}
        
        <Route path="/admin" render={routerProps => {
          //需要登录权限
          return <App {...routerProps} />
        }}></Route>

        {mainRouter.map(router => {
          return <Route key={router.pathname} path={router.pathname} component={router.component} />
        })}

        <Redirect to="/admin" from="/" exact />
        {/* <Redirect to="/404" /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
