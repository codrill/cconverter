import React from 'react'
import {Icon, Menu} from 'antd'
import './MainHeaderComponent.scss'

const MainHeader = () => {
  return (
    <div className="main-header cc-container">
      <h1 className="main-header__logo">
        CConverter
        <span>Konwerter Walut / FX Rate</span>
      </h1>
      <Menu
        className="main-header__menu"
        theme={'cc-theme-purple'}
        mode={'horizontal'}>
        <Menu.Item key="1">
          <a href="https://github.com/mad-rat/cconverter" title="GitHub Repo"  target="_blank" rel="noopener noreferrer">
            <Icon type="github"/> GitHub
          </a>
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
