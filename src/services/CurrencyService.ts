import { urlApiNBPTableA, urlApiNBPTableB } from "../constants/CurrencyApiConstants"
import { forkJoin, from } from "rxjs";
import { map } from "rxjs/operators";
import { useEffect, useState } from "react";
import { returnPreparedCurrencyObject } from "../utils/object";
import { polishCurrencyCode, polishCurrencyObject } from "../constants/PolishCurrencyObject";
import { ApiRate, CurrencyHistoryData } from "../components/Dashboard/Dashboard";

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

export type Currency = {
    no: string
    effectiveDate: string
    mid: number
}

export function useCurrenciesFetch() {
    return forkJoin({
        currencyTableA: request(urlApiNBPTableA),
        currencyTableB: request(urlApiNBPTableB)
    }).pipe(
        map(data => {
            return returnPreparedCurrencyObject(data)
        })
    )
}

const NO_ELEMENT_FOUND_INDEX = -1

export function useFetchHistoryData(selectedCurrencies: CurrencyHistoryData[]) {

    const [data, setData] = useState<HistoryData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const selectedPolishCurrencyIndex = selectedCurrencies.findIndex(currency => currency.code === polishCurrencyCode)

    useEffect(() => {
        if (selectedPolishCurrencyIndex === NO_ELEMENT_FOUND_INDEX) {
            forkJoin({
                firstCurrency: request(`http://api.nbp.pl/api/exchangerates/rates/${selectedCurrencies[0]?.table}/${selectedCurrencies[0]?.code}/last/90`),
                secondCurrency: request(`http://api.nbp.pl/api/exchangerates/rates/${selectedCurrencies[1]?.table}/${selectedCurrencies[1]?.code}/last/90`)
            }).subscribe(({firstCurrency, secondCurrency}) => {
                setData(prepareHistoryData(firstCurrency.rates, false, secondCurrency.rates));
                setLoading(false)
            })
        }

        if (selectedPolishCurrencyIndex > NO_ELEMENT_FOUND_INDEX) {
            selectedCurrencies.slice(selectedPolishCurrencyIndex, 1)

            forkJoin({
                currency: request(`http://api.nbp.pl/api/exchangerates/rates/${selectedCurrencies[0]?.table}/${selectedCurrencies[0]?.code}/last/90`)
            }).subscribe(({currency}) => {
                setData(prepareHistoryData(currency.rates, !selectedPolishCurrencyIndex));
                setLoading(false)

            })
        }
    }, [selectedCurrencies, selectedPolishCurrencyIndex])

    return {data, loading}
}

const prepareHistoryData = (firstCurrency: Currency[], divideByCurrency = false, secondCurrency?: Currency[]) => {
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
            if (divideByCurrency) {
                return historyData.push({
                    date: rate.effectiveDate,
                    rate: rate.mid = Number((polishCurrencyObject.mid / rate.mid).toFixed(5))
                })
            }
            return historyData.push({
                date: rate.effectiveDate,
                rate: rate.mid = Number((rate.mid).toFixed(5))
            })
        })
    }
    return historyData;
}

const request = (url: string) => from(fetch(url)
    .then(data => data.json()));
