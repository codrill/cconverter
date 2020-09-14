import React from "react";
import {Select} from "antd";
import {useTranslation} from "react-i18next";

import {configuredLanguages} from "../../config/languages";
import styles from "./ChangeLanguage.module.scss";

type AvailableLanguageCodes = 'pl' | 'en'
const {Option} = Select

export const ChangeLanguage: React.FC = () => {
  const {t, i18n} = useTranslation();

  const onLanguageChange = (lang: AvailableLanguageCodes) => i18n.changeLanguage(lang)

  return (
    <div className={styles.changeLanguage}>
      <label htmlFor="languageSelect" className="sr-only">{t('SelectLanguageLabel')}</label>
      <Select className={styles.language__select} id="languageSelect" dropdownClassName={styles.language__dropdown} showArrow={false}
              aria-expanded="false" defaultValue={i18n.language as AvailableLanguageCodes} onChange={onLanguageChange}>
        {configuredLanguages.map(item => (
            <Option key={item.name} value={item.code}>
              <img src={item.icon} alt={item.name} />
              <span>{item.name}</span>
            </Option>
          )
        )}
      </Select>
    </div>
  )
}
