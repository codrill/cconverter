import React from 'react'
import './ContactComponent.scss'
import { Helmet } from 'react-helmet'
import ContactForm from "../ContactFormComponent/ContactFormComponent";
import { FacebookOutlined, GithubOutlined, GlobalOutlined } from "@ant-design/icons/lib";
import { codrillWebsite, facebookProfile, githubProfile } from "../../constants/urls";
import { useTranslation } from "react-i18next";

const Contact = () => {
    const {t} = useTranslation();

    return (
        <div className="contact">

            <Helmet>
                <title>CConverter - {t('ContactHelmetTitle')}</title>
            </Helmet>

            <div className="contact__details">
                <h3>{t('ContactInformation')}</h3>

                <div className="contact__details__icons">
                    <div className="contact__details__icon facebook">
                        <a href={facebookProfile}>
                            <FacebookOutlined/>
                        </a>
                    </div>

                    <div className="contact__details__icon site">
                        <a href={codrillWebsite}>
                            <GlobalOutlined/>
                        </a>
                    </div>

                    <div className="contact__details__icon github">
                        <a href={githubProfile}>
                            <GithubOutlined/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="contact__form">
                <h1>{t('ContactFormHeader')}</h1>
                <ContactForm/>
            </div>
        </div>
    )
}

export default Contact