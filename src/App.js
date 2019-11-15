import React from 'react'
import './App.scss'
import {Dashboard} from './components/Dashboard'
import MainHeader from './components/MainHeaderComponent/MainHeaderComponent'
import {Layout} from 'antd'

const {Header, Content} = Layout

const App = () => {
  return (
    <div>
      <Layout className="main-layout">
        <Header className="header-purple">
          <MainHeader/>
        </Header>
        <Content>
          <Dashboard/>
        </Content>

      </Layout>
    </div>
  )
}

export default App
