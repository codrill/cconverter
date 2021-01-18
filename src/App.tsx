import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import { About } from './components/AboutComponent/AboutComponent'
import { Contact } from './components/ContactComponent/ContactComponent'
import { UndefinedRoute } from './components/UndefinedRouteComponent/UndefinedRouteComponent'
import { MainHeader } from './components/MainHeaderComponent/MainHeaderComponent'
import { DashboardContainer } from './components/Dashboard/Dashboard.container'

import './App.scss'

const { Header, Content } = Layout

export const App: React.FC = () => {
  return (
    <div className="cc-theme-purple">
      <Router basename={process.env.PUBLIC_URL}>
        <Layout className="main-layout">
          <Header className="main-layout__header">
            <MainHeader />
          </Header>

          <Switch>
            <Route exact path="/">
              <Content className="main-layout__content">
                <DashboardContainer />
              </Content>
            </Route>

            <Route path="/about">
              <Content className="main-layout__content">
                <About />
              </Content>
            </Route>

            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="*">
              <UndefinedRoute />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  )
}
