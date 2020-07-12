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
                <p>Znajdziesz nas na:</p>

                <div className="contact__details__icons">
                    <div className="facebook">
                        <a href={facebookProfile}>
                            <FacebookOutlined/>
                        </a>
                    </div>

                    <div className="site">
                        <a href={codrillWebsite}>
                            <GlobalOutlined/>
                        </a>
                    </div>

                    <div className="github">
                        <a href={githubProfile}>
                            <GithubOutlined/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="contact__form">
                <ContactForm/>
            </div>
        </div>
    )
}

export default Contact