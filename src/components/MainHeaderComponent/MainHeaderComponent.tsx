import React from 'react'
import { Menu, Select } from 'antd'
import {BuildFilled, ContainerFilled } from "@ant-design/icons/lib"
import {useTranslation} from "react-i18next"
import { Link, useLocation } from 'react-router-dom'

import { menuRoutes } from '../../config/routes'
import {configuredLanguages} from "../../config/languages";

import './MainHeaderComponent.scss'

const {Option} = Select

export type AvailableLanguageCodes = 'pl' | 'en'

const MainHeader = () => {
    const {pathname} = useLocation();
    const {t, i18n} = useTranslation();

    const onLanguageChange = (lang: AvailableLanguageCodes) => i18n.changeLanguage(lang)

    return (
        <div className="main-header cc-container">
            <h1 className="main-header__logo">
                <Link to={menuRoutes.home().path}>
                    {menuRoutes.home().label}
                    <span>{t('FX Rate')}</span>
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
                        <BuildFilled />
                        <span className="menu__item__label" data-hover={t(menuRoutes.about().label)}>
              {t(menuRoutes.about().label)}
            </span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={menuRoutes.contact().path}>
                    <Link to={menuRoutes.contact().path}>
                        <ContainerFilled />
                        <span className="menu__item__label" data-hover={t(menuRoutes.contact().label)}>
              {t(menuRoutes.contact().label)}
            </span>
                    </Link>
                </Menu.Item>
                <Menu.Item className="menu__item__language">
                    <label htmlFor="languageSelect" className="sr-only">Select language</label>
                    <Select className="language__select" id="languageSelect" dropdownClassName="language__dropdown" showArrow={false}
                            aria-expanded="false" defaultValue={i18n.language as AvailableLanguageCodes} onChange={onLanguageChange}>
                        {configuredLanguages.map(item => (
                            <Option key={item.name} value={item.code}>
                              <img src={item.icon} alt={item.name} />
                              <span>{item.name}</span>
                            </Option>
                          )
                        )}
                    </Select>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default MainHeader
