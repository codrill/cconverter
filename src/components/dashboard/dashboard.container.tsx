import React from 'react'

import { useCurrenciesFetch } from '../../services/currencyService'

import { ApiRate, Dashboard } from './dashboard'

export const DashboardContainer: React.FC = () => {
  const { rates, date } = useCurrenciesFetch()

  return <Dashboard rates={rates} date={date} dataReady={!!rates.length} />
}
