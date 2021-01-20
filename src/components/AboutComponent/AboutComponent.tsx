import React from 'react'
import './AboutComponent.scss'
import { Helmet } from 'react-helmet'
import { Trans, useTranslation } from 'react-i18next'

export const About: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="about">
      <Helmet>
        <title>CConverter - {t('AboutHelmetTitle')}</title>
      </Helmet>

      <div className="about-layout">
        <div className="about-layout__item">
          <div className="about-layout__info">
            <Trans i18nKey="AboutSectionHowToUse" components={{ paragraph: <p />, bold: <strong /> }}>
              <p>
                <strong>CConverter</strong> is an open-source project created by <strong>Codrill</strong>. Having at
                your disposal 150 currencies from all over the world, conversions become very simple.
              </p>
              <p>
                It only takes choosing currencies you&apos;re interested in and specify the number. This application
                will automatically convert given amount, basing on adequate and official exchange rates.
              </p>
            </Trans>
          </div>

          <div className="about-layout__foto dollar-foto" />
        </div>
        <div className="about-layout__item">
          <div className="about-layout__foto bank-foto" />

          <div className="about-layout__info">
            <p>
              <Trans i18nKey="AboutSectionNBP">
                In order to guarantee our users reliable and official exchange rates we use data provided by the
                <strong>National Bank of Poland</strong>, where the most popular values are upgraded every working day
                and more exotic ones every Wednesday.
              </Trans>
            </p>
          </div>
        </div>

        <div className="about-layout__item">
          <div className="about-layout__info">
            <Trans i18nKey="AboutSectionRWD" components={{ paragraph: <p />, bold: <strong /> }}>
              <p>
                Our converter is adjusted to be used on any device. Do you need a quick conversion? This app works
                flawlessly on both mobile phones and tablets.
              </p>
              <p>
                <strong>CConverter</strong> is continuously developed. We therefore encourage you to share your thoughts
                using our application form.
              </p>
            </Trans>
          </div>

          <div className="about-layout__foto rwd-foto" />
        </div>
      </div>
    </div>
  )
}
