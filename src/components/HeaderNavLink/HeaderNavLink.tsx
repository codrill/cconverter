import React, {ReactElement} from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import styles from "./HeaderNavLink.module.scss"

type Props = {
  icon: ReactElement
  route: {path: string, label: string}
}

export const HeaderNavLink: React.FC<Props> = ({icon, route}) => {
  const {t} = useTranslation();

  return (
    <li className={styles.navLink}>
      <NavLink activeClassName={styles.active} to={route.path}>
        {icon}
        <span className={styles.navLink__label} data-hover={t(route.label)}>
                      {t(route.label)}
                    </span>
      </NavLink>
    </li>
  )
}