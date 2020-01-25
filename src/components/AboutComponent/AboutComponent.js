import React from 'react'
import './AboutComponent.scss'
import { Helmet } from 'react-helmet'

const About = () => {
  return (
    <div className="about">
      <Helmet>
        <title>CConverter - O projekcie</title>
      </Helmet>
      
      <h1>O Projekcie CConverter</h1>
    </div>
  )
}

export default About