import {Button, Input} from "antd"
import './Dashboard.scss'
import React, {useEffect, useState} from "react"
import {getCurrencyValues} from "../services/CurrencyService"
import {CurrencySelect} from './CurrecySelectComponent/SelectComponent'
import {DateAndRateDisplay} from './DateAndRateDisplayComponent/DateAndRateDisplayComponent'
import {initialSelectToValue, initialSelectFromValue, inputPlaceholder} from '../constants/Variables'

const regex = new RegExp("^[+-]?\\d+(\\.\\d{0,2})?$")

export const Dashboard = () => {

  const [apiRates, setApiRates] = useState([])
  const [fromCurrency, setFromCurrency] = useState(undefined)
  const [toCurrency, setToCurrency] = useState(undefined)
  const [userValue, setUserValue] = useState(null)
  const [converterValue, setConvertedValue] = useState(null)
  const [date, setCurrentDate] = useState('')
  const [exchangeRate, setExchangeRate] = useState(0)

  useEffect(() => {
    getCurrencyValues().then(array => {
      setApiRates(array.rates)
      setCurrentDate(array.date)
      setInitialCurrencies(array.rates)
    })
  }, [])

  useEffect(() => {
    const firstValue = apiRates.find(rate => rate.code === fromCurrency)
    const secondValue = apiRates.find(rate => rate.code === toCurrency)

    if (firstValue && secondValue) {
      setExchangeRate(firstValue.mid / secondValue.mid)
      setConvertedValue((userValue * exchangeRate).toFixed(2).toString())
    }
  }, [apiRates, fromCurrency, toCurrency, userValue, exchangeRate])

  const onChangeValue = (value) => {
    if (!value.target.value) {
      setUserValue(null) }
    else if (regex.test(value.target.value))
      setUserValue(value.target.value)
  }

  const onCurrencySwap = () => {
    const temporaryFromCurrencyKeeper = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temporaryFromCurrencyKeeper)
  }

  const setInitialCurrencies = (apiRates) => {
    setFromCurrency(findAndReturnCurrencyByCode(apiRates, initialSelectFromValue))
    setToCurrency(findAndReturnCurrencyByCode(apiRates, initialSelectToValue))
  }

  return (
    <div className="converter-container">
      <div className="selector-wrapper">

        <CurrencySelect
          value={fromCurrency}
          onChange={setFromCurrency}
          currencyRates={apiRates}/>

        <div className="source-input">
          <Input
            placeholder={inputPlaceholder}
            value={userValue}
            onChange={onChangeValue}/>
        </div>

        <div className="replace-currency-button">
          <Button
            type="primary"
            icon="swap"
            disabled={!fromCurrency || !toCurrency}
            onClick={onCurrencySwap}/>
        </div>

        <div className="destination-input">
          <Input
            placeholder={inputPlaceholder}
            value={converterValue}/>
        </div>

        <CurrencySelect
          value={toCurrency}
          onChange={setToCurrency}
          currencyRates={apiRates}/>
      </div>

      <div className="effectiveDate">
        <h4>{DateAndRateDisplay(exchangeRate, date)}</h4>
      </div>
    </div>
  )
}

const findAndReturnCurrencyByCode = (apiRates, currencyCode) => {
  return apiRates.find(rate => rate.code === currencyCode).code
}
