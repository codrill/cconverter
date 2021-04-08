import React from 'react'
import Helmet from 'react-helmet'

type Props = {
  gtag: string
}

// TODO: https://github.com/nfl/react-helmet/issues/342
// Export to new component due to inability of using Fragments inside Helmet
export const GoogleAnalytics = ({ gtag }: Props): JSX.Element => {
  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag}');
        `}
      </script>
    </Helmet>
  )
}
