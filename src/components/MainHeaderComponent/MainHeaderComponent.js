import React from 'react'
import { Icon, Menu } from 'antd'
import './MainHeaderComponent.scss'
import { Link } from 'react-router-dom'

const MainHeader = () => {
  return (
    <div className="main-header cc-container">
      <h1 className="main-header__logo">
        <Link to="/">
          CConverter
          <span>Konwerter Walut / FX Rate</span>
        </Link>
      </h1>
      <Menu
        className="main-header__menu"
        theme={ 'cc-theme-purple' }
        mode={ 'horizontal' }>
        <Menu.Item key="1">
          <a href="https://github.com/mad-rat/cconverter" title="GitHub Repo" target="_blank"
             rel="noopener noreferrer">
            <Icon type="github"/> GitHub
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">
            <Icon type="build" theme="filled"/> O projekcie
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/contact">
            <Icon type="container" theme="filled"/> Kontakt
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default MainHeader
