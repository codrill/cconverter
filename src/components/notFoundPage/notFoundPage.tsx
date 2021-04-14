import React from 'react'
import { Button } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { menuRoutes } from '../../config/routes'

import styles from './notFoundPage.module.scss'

export const NotFoundPage: React.FC = () => {
  const activeLocation = useLocation()
  const history = useHistory()
  const { t } = useTranslation()

  function goHomeHandler() {
    history.push(menuRoutes.home().path)
  }

  return (
    <div className={`cc-container ${styles.notFound}`}>
      <div className={styles.notFound__info}>
        <h1 className={styles.notFound__header}>404</h1>
        <h2 className={styles.notFound__subheader}>{t('NotFoundPageSubheader')}</h2>
        <p className={styles.notFound__description}>
          <span>{t('NotFoundPageDescription')}</span>
          <span className={styles.notFound__path}>{activeLocation.pathname}</span>
        </p>

        <Button type="primary" className="cc-btn--gradient" onClick={goHomeHandler}>
          {t('NotFoundPageBtnHome')}
        </Button>
      </div>
      <div className={styles.notFound__img} />
    </div>
  )
}
