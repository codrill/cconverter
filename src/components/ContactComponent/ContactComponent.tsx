import React from 'react'
import './ContactComponent.scss'
import { Helmet } from 'react-helmet'
import ContactForm from "../ContactFormComponent/ContactFormComponent";
import { FacebookOutlined, GithubOutlined, GlobalOutlined } from "@ant-design/icons/lib";
import { codrillWebsite, facebookProfile, githubProfile } from "../../constants/urls";

const Contact = () => {
    return (
        <div className="contact">

            <Helmet>
                <title>CConverter - Kontakt</title>
            </Helmet>

            <div className="contact__details">
                <h3>Odwiedź nas:</h3>

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
                <h1>Formularz kontaktowy</h1>
                <ContactForm/>
            </div>
        </div>
    )
}

export default Contact