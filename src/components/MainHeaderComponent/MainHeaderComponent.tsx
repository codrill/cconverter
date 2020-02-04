import React from 'react'
import {Icon, Menu} from 'antd'
import './MainHeaderComponent.scss'
import {Link, useLocation} from 'react-router-dom'
import {menuRoutes} from '../../config/routes'

const MainHeader = () => {
  const {pathname} = useLocation();

  return (
    <div className="main-header cc-container">
      <h1 className="main-header__logo">
        <Link to={menuRoutes.home().path}>
          {menuRoutes.home().label}
          <span>Konwerter Walut / FX Rate</span>
        </Link>
      </h1>
      <Menu
        className="main-header__menu"
        theme={"dark"}
        mode={'horizontal'}
        defaultSelectedKeys={[menuRoutes.home().path]}
        selectedKeys={[pathname]}
        focusable={false}>

        <Menu.Item key={menuRoutes.about().path}>
          <Link to={menuRoutes.about().path}>
            <Icon type="build" theme="filled"/>
            <span data-hover={menuRoutes.about().label}>
              {menuRoutes.about().label}
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key={menuRoutes.contact().path}>
          <Link to={menuRoutes.contact().path}>
            <Icon type="container" theme="filled"/>
            <span data-hover={menuRoutes.contact().label}>
              {menuRoutes.contact().label}
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <a href={menuRoutes.github().path}
             title={menuRoutes.github().label}
             target="_blank"
             rel="noopener noreferrer"
          >
            <Icon type="github"/>
          </a>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default MainHeader
