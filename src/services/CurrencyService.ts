import { urlApiNBPTableA, urlApiNBPTableB } from "../constants/CurrencyApiConstants"
import { forkJoin, from } from "rxjs";
import { map } from "rxjs/operators";
import { ApiRate } from "../components/Dashboard";
import { useEffect, useState } from "react";
import { CurrencyHistoryData } from "../App";
import { returnPreparedCurrencyObject } from "../utils/object";
import { polishCurrencyCode } from "../constants/PolishCurrencyObject";

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

    const request = (url: string) => from(fetch(url)
        .then(data => data.json()));

    const checkIfPolishCurrencySelected = selectedCurrencies.findIndex(currency =>  currency.code === polishCurrencyCode)

    useEffect(() => {

        console.log('useEffect')

        if (checkIfPolishCurrencySelected) {
            selectedCurrencies = selectedCurrencies.filter(selectedCurrency => {
                return selectedCurrency.code !== polishCurrencyCode
            })
        }

        console.log(selectedCurrencies)

        if (selectedCurrencies.length === 2) {
            forkJoin({
                firstCurrency: request(`http://api.nbp.pl/api/exchangerates/rates/${selectedCurrencies[0]?.table}/${selectedCurrencies[0]?.code}/last/${period}`),
                secondCurrency: request(`http://api.nbp.pl/api/exchangerates/rates/${selectedCurrencies[1]?.table}/${selectedCurrencies[1]?.code}/last/${period}`)
            }).subscribe(({firstCurrency, secondCurrency}) => {
                setData(prepareHistoryData(firstCurrency.rates, secondCurrency.rates));
                setLoading(false)

            })
        }

        if (selectedCurrencies.length === 1) {
            forkJoin({
                currency: request(`http://api.nbp.pl/api/exchangerates/rates/${selectedCurrencies[0]?.table}/${selectedCurrencies[0]?.code}/last/${period}`)
            }).subscribe(({currency}) => {
                setData(prepareHistoryData(currency.rates));
                setLoading(false)

            })
        }
    }, [period])

    return {data, loading}
}

const prepareHistoryData = (firstCurrency: any[], secondCurrency?: any[]) => {
    const historyData: HistoryData[] = []

    if (firstCurrency && secondCurrency) {
        firstCurrency.map((rate, index) => {
            return historyData.push({
                date: rate.effectiveDate,
                rate: rate.mid = Number((rate.mid / secondCurrency[index].mid).toFixed(5))
            })
        })
    } else {
        firstCurrency.map((rate) => {
            return historyData.push({
                date: rate.effectiveDate,
                rate: rate.mid = Number((rate.mid).toFixed(5))
            })
        })
    }
    return historyData;
}
