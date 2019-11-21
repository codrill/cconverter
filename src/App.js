import React from 'react'
import './App.scss'
import {Dashboard} from './components/Dashboard'
import MainHeader from './components/MainHeaderComponent/MainHeaderComponent'
import {Layout} from 'antd'

const {Header, Content} = Layout

const App = () => {
  return (
    <div className="cc-theme-purple">
      <Layout className="main-layout ">
        <Header className="main-layout__header">
          <MainHeader/>
        </Header>
        <Content className="main-layout__content">
          <Dashboard/>
        </Content>
      </Layout>
    </div>
  )
}

export default App
