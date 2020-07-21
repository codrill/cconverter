import React from 'react'
import { Menu, Select } from 'antd'
import {BuildFilled, ContainerFilled } from "@ant-design/icons/lib"
import {useTranslation} from "react-i18next"
import { Link, useLocation } from 'react-router-dom'

import { menuRoutes } from '../../config/routes'

import './MainHeaderComponent.scss'
import polish from '../../assets/img/flag-polish.svg';
import english from '../../assets/img/flag-english.svg';

const {Option} = Select

type AvailableLanguageCodes = 'pl' | 'en'

type ConfiguredLanguage = {
  code: string
  icon: string
  name: string
}
const configuredLanguages: ConfiguredLanguage[] = [
  {
    code: 'pl',
    icon: polish,
    name: 'polski',
  },
  {
    code: 'en',
    icon: english,
    name: 'english'
  }
]

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
                    <Select className="language__select" dropdownClassName="language__dropdown" showArrow={false}
                            defaultValue={i18n.language as AvailableLanguageCodes} onChange={onLanguageChange}>
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
