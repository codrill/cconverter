import React from 'react'
import { useTranslation } from 'react-i18next'

import styles from './contactFormSent.module.scss'

export const ContactFormSent: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t('ContactFormSentHeader')}</h1>
      <div className={styles.contactFormSent}>
        <p>{t('ContactFormSentSuccess')}</p>
        <p>{t('ContactFormSentResponse')}</p>
      </div>
    </>
  )
}
