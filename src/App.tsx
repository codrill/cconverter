import React from 'react'
import './App.scss'
import { Dashboard } from './components/Dashboard'
import MainHeader from './components/MainHeaderComponent/MainHeaderComponent'
import { Layout } from 'antd'

import About from './components/AboutComponent/AboutComponent'
import Contact from './components/ContactComponent/ContactComponent'
import UndefinedRoute from './components/UndefinedRouteComponent/UndefinedRouteComponent'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <div className="cc-theme-purple">
      <Router basename={ process.env.PUBLIC_URL }>
        <Layout className="main-layout">
          <Header className="main-layout__header">
            <MainHeader/>
          </Header>
          
          <Switch>
            <Route exact path="/">
              <Content className="main-layout__content">
                <Dashboard/>
              </Content>
            </Route>
            
            <Route path="/about">
              <About/>
            </Route>
            
            <Route path="/contact">
              <Contact/>
            </Route>
            
            <Route path="*">
              <UndefinedRoute/>
            </Route>
          </Switch>
        
        </Layout>
      </Router>
    </div>
  )
};

export default App
