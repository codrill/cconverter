import React from 'react'
import { useLocation } from 'react-router-dom'

export const UndefinedRoute: React.FC = () => {
  const activeLocation = useLocation()

  return (
    <div>
      <h4>Wprowadzono nieprawidłowy adres URL:</h4>
      <code>{activeLocation.pathname}</code>
    </div>
  )
}
