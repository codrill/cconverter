import React, { useEffect, useState } from "react";

import { ApiRate, Dashboard } from "./Dashboard";
import { useCurrenciesFetch } from "../../services/CurrencyService";

type Response = {
    rates: ApiRate[];
    date: string
}

const resource = useCurrenciesFetch();

export const DashboardContainer: React.FC = () => {
    const [apiRates, setApiRates] = useState<ApiRate[]>([])
    const [date, setCurrentDate] = useState('')

    const [dataReady, setDataReady] = useState(false)

    useEffect(() => {
        resource.subscribe((response: any) => {
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