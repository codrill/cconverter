import { urlApiNBPTableA, urlApiNBPTableB } from "../constants/CurrencyApiConstants"
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { ApiRate } from "../components/Dashboard";
import { useEffect, useState } from "react";
import { CurrencyHistoryData } from "../App";
import { returnPreparedCurrencyObject } from "../utils/object";

export interface CurrencyResponse {
    currencyTableA: CurrencyTableObject[]
    currencyTableB: CurrencyTableObject[]
}

export interface CurrencyTableObject {
    table: string
    currency: string
    code: string
    rates: ApiRate[]
    effectiveDate: Date
}

export interface HistoryData {
    date: string
    rate: number
}

export function useCurrenciesFetch() {
    return forkJoin({
        currencyTableA: fetch(urlApiNBPTableA)
            .then(result => result.json()),
        currencyTableB: fetch(urlApiNBPTableB)
            .then(result => result.json()),
    }).pipe(
        map(data => {
            return returnPreparedCurrencyObject(data)
        })
    )
}

export function useFetchHistoryData(selectedCurrencies: CurrencyHistoryData[], period: number) {

    const [data, setData] = useState<HistoryData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        forkJoin({
            firstCurrency: fetch(`http://api.nbp.pl/api/exchangerates/rates/${selectedCurrencies[0]?.table}/${selectedCurrencies[0]?.code}/last/${period}`)
                .then(data => data.json()),
            secondCurrency: fetch(`http://api.nbp.pl/api/exchangerates/rates/${selectedCurrencies[1]?.table}/${selectedCurrencies[1]?.code}/last/${period}`)
                .then(data => data.json()),
        }).subscribe(({firstCurrency, secondCurrency}) => {
            setData(prepareHistoryData(firstCurrency.rates, secondCurrency.rates));
            setLoading(false)

        })
    }, [selectedCurrencies, period])

    return {data, loading}
}

const prepareHistoryData = (firstCurrency: any[], secondCurrency: any[]) => {
    const historyData: HistoryData[] = []

    if (firstCurrency && secondCurrency) {
        firstCurrency.map((rate, index) => {
            return historyData.push({
                date: rate.effectiveDate,
                rate: rate.mid = Number((rate.mid / secondCurrency[index].mid).toFixed(5))
            })
        })
    }
    return historyData;
}
