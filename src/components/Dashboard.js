import {Button, Icon, Input} from "antd"
import './Dashboard.scss'
import React, {useEffect, useState} from "react"
import {getCurrencyValues} from "../services/CurrencyService"
import {CurrencySelect} from './CurrecySelectComponent/SelectComponent'
import {DateDisplay, RateDisplay} from './DateAndRateDisplayComponent/DateAndRateDisplayComponent'
import {initialSelectFromValue, initialSelectToValue, inputPlaceholder} from '../constants/Variables'

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
      setUserValue(null)
    } else if (regex.test(value.target.value))
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
    <div className="converter cc-container">
      <div className="converter__info">
        <div className="converter__info__content">
          <p>
            Wyliczenia wykonywane są na podstawie najnowszych danych, udostępnionych przez <strong>Narodowy Bank Polski</strong>.
          </p>
          <p>Wartości przedstawione w serwisie, stanowią medianę reprezentatywnych walut.</p>

          <p>{DateDisplay(date)}</p>
        </div>
      </div>

      <div className="converter__calc__shadow">
      </div>

      <div className="converter__calc">
        <h2 className="converter__calc__header">
          Przelicz walutę
        </h2>

        <div className="converter__calc__group">
          <CurrencySelect
            value={fromCurrency}
            onChange={setFromCurrency}
            currencyRates={apiRates}/>
          <Input
            placeholder={inputPlaceholder}
            value={userValue}
            onChange={onChangeValue}/>
        </div>

        <Button
          type="primary"
          className="btn-swap cc-btn--gradient"
          disabled={!fromCurrency || !toCurrency}
          onClick={onCurrencySwap}>
          <Icon
            type="swap"
            rotate="90"
            className="btn-swap-icon"/>
        </Button>

        <div className="converter__calc__group">
          <CurrencySelect
            value={toCurrency}
            onChange={setToCurrency}
            currencyRates={apiRates}/>
        </div>
        <Input
          placeholder={inputPlaceholder}
          value={converterValue}/>

          <div className="converter__calc__rate">
            <p>{RateDisplay(exchangeRate)}</p>
          </div>
      </div>
    </div>
  )
}

const findAndReturnCurrencyByCode = (apiRates, currencyCode) => {
  return apiRates.find(rate => rate.code === currencyCode).code
}
