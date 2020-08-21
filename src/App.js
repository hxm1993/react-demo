import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { Button, Pagination } from 'antd';
import { Route, Switch, Redirect } from "react-router-dom";
import { adminRouter } from "./routes"
import { Frame } from "./components"
import { connect } from 'react-redux';

const routes = adminRouter.filter(route => route.isNav)

const mapStateToProps = state => {
  const {isLogin, userInfo} = state.login
  return {
    isLogin,
    userInfo
  }
}

@connect(mapStateToProps)
class App extends Component {
  render() { 
    return (
      this.props.isLogin
      ?
      <Frame menu={routes}>
        <Switch>
          {
            adminRouter.map(route => {
              return <Route
                key={route.pathname}
                exact={route.exact}
                path={route.pathname}
                render={(routerProps) => {
                  return <route.component {...routerProps} />
                }} />
            })
          }
          
          <Redirect to={adminRouter[0].pathname} from="/admin" exact/>
          <Redirect to="/404" />
        </Switch>
      </Frame>
      :
      <Redirect to="/login"/>
    )
  }
}

export default App;
