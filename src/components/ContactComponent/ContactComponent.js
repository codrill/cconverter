import React from 'react'
import './ContactComponent.scss'
import { Helmet } from 'react-helmet'

const Contact = () => {
  return (
    <div className="contact">
  
      <Helmet>
        <title>CConverter - Kontakt</title>
      </Helmet>
      
      <div className="contact__form">
        Formularz kontaktowy
      </div>
      <div className="contact__details">
        Dane kontaktowe
      </div>
    </div>
  )
}

export default Contact