import React, {useEffect, useState} from "react";
import {from} from "rxjs";

import Dashboard, {ApiRate} from "./Dashboard";
import {getCurrencyValues} from "../../services/CurrencyService";

type Response = {
  rates: ApiRate[];
  date: string
}

const resource = getCurrencyValues()
const $resourceObservable = from(resource)

export const DashboardContainer: React.FC = () => {
  const [apiRates, setApiRates] = useState<ApiRate[]>([])
  const [date, setCurrentDate] = useState('')

  const [dataReady, setDataReady] = useState(false)

  useEffect(() => {
    $resourceObservable.subscribe((response: Response) => {
      setApiRates(response.rates)
      setCurrentDate(response.date)
      setDataReady(true)
    })
  }, [])

  return (
      <Dashboard rates={apiRates} date={date} dataReady={dataReady}/>
  )
}

export default DashboardContainer