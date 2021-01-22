import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import { About } from './components/about/about'
import { Contact } from './components/contact/contact'
import { UndefinedRoute } from './components/undefinedRoute/undefinedRoute'
import { MainHeader } from './components/mainHeader/mainHeader'
import { DashboardContainer } from './components/dashboard/dashboard.container'

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
