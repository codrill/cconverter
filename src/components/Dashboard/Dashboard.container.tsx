import React, { useEffect, useState } from 'react'

import { useCurrenciesFetch } from '../../services/CurrencyService'

import { ApiRate, Dashboard } from './Dashboard'

type Response = {
  rates: ApiRate[]
  date: string
}

export const DashboardContainer: React.FC = () => {
  const [apiRates, setApiRates] = useState<ApiRate[]>([])
  const [date, setCurrentDate] = useState('')

  const [dataReady, setDataReady] = useState(false)

  const resource = useCurrenciesFetch()

  useEffect(() => {
    resource.subscribe((response) => {
      setApiRates(response.rates)
      setCurrentDate(response.date)
      setDataReady(true)
    })
  }, [])

  return <Dashboard rates={apiRates} date={date} dataReady={dataReady} />
}
