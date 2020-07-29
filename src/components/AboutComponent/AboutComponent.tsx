import React from 'react'
import './AboutComponent.scss'
import { Helmet } from 'react-helmet'
import { Trans, useTranslation } from "react-i18next";

const About: React.FC = () => {

    const {t} = useTranslation();

    return (
        <div className="about">
            <Helmet>
                <title>{t('AboutHelmetTitle')}</title>
            </Helmet>

            <div className="about-layout">
                <div className="about-layout__item">
                    <div className="about-layout__info">
                        <p><Trans i18nKey="AboutSectionHowToUseFirstParagraph"/></p>
                        <p><Trans i18nKey='AboutSectionHowToUseSecondParagraph'/></p>
                    </div>

                    <div className="about-layout__foto dollar-foto"/>

                </div>
                <div className="about-layout__item">
                    <div className="about-layout__foto bank-foto"/>

                    <div className="about-layout__info">
                        <p><Trans i18nKey='AboutSectionNBP'/></p>
                    </div>
                </div>

                <div className="about-layout__item">
                    <div className="about-layout__info">
                        <p><Trans i18nKey='AboutSectionRWDFirstParagraph'/></p>
                        <p><Trans i18nKey='AboutSectionRWDSecondParagraph'/></p>
                    </div>

                    <div className="about-layout__foto rwd-foto"/>

                </div>
            </div>
        </div>
    )
}

export default About
