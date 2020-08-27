import React from 'react'
import {BuildFilled, ContainerFilled } from "@ant-design/icons/lib"
import {useTranslation} from "react-i18next"
import {Link} from 'react-router-dom'

import { menuRoutes } from '../../config/routes'

import './MainHeaderComponent.scss'
import {HeaderNavLink} from "../HeaderNavLink/HeaderNavLink";
import {ChangeLanguage} from "../ChangeLanguage/ChangeLanguage";

const MainHeader = () => {
    const {t} = useTranslation();

    return (
        <div className="main-header cc-container">
            <h1 className="main-header__logo">
                <Link to={menuRoutes.home().path}>
                    {menuRoutes.home().label}
                    <span>{t('FX Rate')}</span>
                </Link>
            </h1>
            <ul className="main-header__menu">
              <HeaderNavLink
                icon={<BuildFilled />}
                route={menuRoutes.about()}
              />
              <HeaderNavLink
                icon={<ContainerFilled />}
                route={menuRoutes.contact()}
              />

              <li>
                <ChangeLanguage />
              </li>
            </ul>
        </div>
    )
}

export default MainHeader
