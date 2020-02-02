import {Button, Icon, Input} from 'antd'
import './Dashboard.scss'
import React, {useEffect, useState} from 'react'
import {getCurrencyValues} from '../services/CurrencyService'
import {CurrencySelect} from './CurrecySelectComponent/SelectComponent'
import {DateDisplay, RateDisplay} from './DateAndRateDisplayComponent/DateAndRateDisplayComponent'
import {initialSelectFromValue, initialSelectToValue, inputPlaceholder} from '../constants/Variables'
import {Helmet} from 'react-helmet'

const regex = new RegExp('^[+-]?\\d+(\\.\\d{0,2})?$');

export type ApiRate = {
  code: string
  mid: number
  currency: string
}

type SelectedValue = ApiRate | undefined

export const Dashboard: React.FC = () => {

  const [apiRates, setApiRates] = useState<ApiRate[]>([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [userValue, setUserValue] = useState(0);
  const [converterValue, setConvertedValue] = useState('');
  const [date, setCurrentDate] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    getCurrencyValues().then(array => {
      setApiRates(array.rates);
      setCurrentDate(array.date);
      setInitialCurrencies(array.rates)
    })
  }, []);

  useEffect(() => {
    const firstValue: SelectedValue = apiRates.find(rate => rate.code === fromCurrency);
    const secondValue: SelectedValue = apiRates.find(rate => rate.code === toCurrency);

    if (firstValue && secondValue) {
      setExchangeRate(firstValue.mid / secondValue.mid);
      setConvertedValue((userValue * exchangeRate).toFixed(2).toString())
    }
  }, [apiRates, fromCurrency, toCurrency, userValue, exchangeRate]);

  const onChangeValue = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (!value.target.value) {
      setUserValue(0)
    } else if (regex.test(value.target.value))
      setUserValue(Number(value.target.value))
  };

  const onCurrencySwap = () => {
    const temporaryFromCurrencyKeeper = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temporaryFromCurrencyKeeper)
  };

  const setInitialCurrencies = (apiRates: ApiRate[]) => {
    setFromCurrency(findAndReturnCurrencyByCode(apiRates, initialSelectFromValue))
    setToCurrency(findAndReturnCurrencyByCode(apiRates, initialSelectToValue))
  };

  const inputChangeHandler = (value: string) => {
    setFromCurrency(value);
  };

  return (
    <div className="converter cc-container">

      <Helmet>
        <title>CConverter - Kalkulator walut</title>
      </Helmet>

      <div className="converter__info">
        <div className="converter__info__content">
          <p>
            Wyliczenia wykonywane są na podstawie najnowszych danych, udostępnionych przez <strong>Narodowy Bank
            Polski</strong>.
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
            rotate={90}
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

const findAndReturnCurrencyByCode = (apiRates: ApiRate[], currencyCode: string) => {
  return apiRates.find(rate => rate.code === currencyCode)?.code || ''
};

export default Dashboard;
