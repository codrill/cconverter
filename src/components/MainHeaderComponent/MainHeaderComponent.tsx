import React, { useState } from 'react'
import { BuildFilled, ContainerFilled } from '@ant-design/icons/lib'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { menuRoutes } from '../../config/routes'
import { HeaderNavLink } from '../HeaderNavLink/HeaderNavLink'
import { ChangeLanguage } from '../ChangeLanguage/ChangeLanguage'

import './MainHeaderComponent.scss'

export const MainHeader = () => {
  const { t } = useTranslation()

  const [menuExpanded, setMenuExpanded] = useState<boolean>(false)

  const onMenuToggle = () => {
    setMenuExpanded((previousExpandedState) => !previousExpandedState)
  }

  return (
    <div className="main-header cc-container">
      <h1 className="main-header__logo">
        <Link to={menuRoutes.home().path}>
          {menuRoutes.home().label}
          <span>{t('FX Rate')}</span>
        </Link>
      </h1>
      <div className={`main-header__hamburger ${menuExpanded ? 'active' : ''}`} onClick={onMenuToggle}>
        <span className="line" />
        <span className="line" />
        <span className="line" />
      </div>
      <ul className="main-header__menu">
        <HeaderNavLink icon={<BuildFilled />} route={menuRoutes.about()} />
        <HeaderNavLink icon={<ContainerFilled />} route={menuRoutes.contact()} />
      </ul>
      <ChangeLanguage />
    </div>
  )
}
