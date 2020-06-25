import React from 'react'
import './AboutComponent.scss'
import { Helmet } from 'react-helmet'

const About: React.FC = () => {
  return (
    <div className="about">
      <Helmet>
        <title>CConverter - O projekcie</title>
      </Helmet>

      <div className="about-layout">
        <div className="about-layout__info">
          <h3>CConverter to open-sourcowy projekt stworzony przez Codrill. Mając do dyspozycji 150 walut z całego
            świata przeliczenia stają się banalnie proste. Wystarczy, że wybierzesz waluty, które Cię interesują oraz
            wpiszesz
            liczbę. To wszystko. Aplikacja automatycznie przeliczy podaną przez Ciebie kwotę po odpowiednim i oficjalnym
            kursie
            wymiany.
          </h3>
        </div>

        <div className="about-layout__foto">

        </div>

        <div className="about-layout__info">
          <p>Żeby zagwarantować naszym użytkownikom pewne i oficjalne kursy wymiany używamy przeliczników podanych przez
            Narodowy Bank Polski, który w każdy dzień roboczy aktualizuje swoje najpopularniejsze waluty. Te
            bardziej egzotyczne aktualizowane są co środę.</p>

          <p>Do najpopularniejszych walut, aktualizowanych codziennie, zaliczamy:</p>
        </div>

      <div className="about-layout__foto">
      </div>

        <div className="about-layout__info">
        <p>Nasz konwerter jest przystosowany do działania na każdym urządzeniu. Potrzebujesz coś szybko przeliczyć?
          Aplikacja
          działa wyśmienicie na telefonach komórkowych czy tabletach.</p>

        <p>CConverter jest na bieżąco rozbudowywany oraz rozwijany. Zachęcamy do dzielenia się uwagami przez nasz
          formularz zgłoszeniowy.</p>
        </div>

        <div className="about-layout__foto">

        </div>
      </div>
    </div>
  )
}

export default About
