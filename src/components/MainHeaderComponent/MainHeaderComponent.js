import React from 'react'
import {Icon, Menu} from 'antd'
import './MainHeaderComponent.scss'


const MainHeader = () => {
  return (
    <div className="main-header cc-container">
      <div className="main-header__logo">
        CConverter
      </div>
      <Menu
        className="main-header__menu"
        theme={'cc-purple'}
        mode={'horizontal'}>
        <Menu.Item key="1">
          <a href="https://github.com/mad-rat/cconverter" target="_blank" title="Github Repo"></a><Icon type="github"/> Github
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="build" theme="filled" /> O projekcie
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="container" theme="filled" /> Kontakt
        </Menu.Item>

      </Menu>
    </div>
  )
}

export default MainHeader
