import React, { useEffect, useReducer, useState } from 'react'
import { Button, Input, Spin } from 'antd'
import { LineChartOutlined, SwapOutlined } from '@ant-design/icons/lib'
import { Helmet } from 'react-helmet'
import { Trans, useTranslation } from 'react-i18next'

import { initialSelectFromValue, initialSelectToValue, inputPlaceholder } from '../../constants/variables'
import { getParsedNumber } from '../../utils/number'
import { CurrencySelect } from '../currencySelect/currencySelect'
import { ExchangeRateHistoryComponent } from '../exchangeRateHistory/exchangeRateHistory'

import './dashboard.scss'

const userInputRegex = new RegExp('^\\d+([,.]\\d{0,2})?$')

type Props = {
  rates: ApiRate[]
  date: string
  dataReady: boolean
}

export type ApiRate = {
  code: string
  mid: number
  currency: string
  table: AvailableTables
}

export type CurrencyHistoryData = {
  code: string
  table: AvailableTables
}

export type AvailableTables = 'A' | 'B' | 'C'
type SelectedValue = ApiRate | undefined

export const Dashboard: React.FC<Props> = ({ rates, date, dataReady }) => {
  const { t } = useTranslation()

  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [userValue, setUserValue] = useState<string>('0')
  const [converterValue, setConvertedValue] = useState<string>('')
  const [exchangeRate, setExchangeRate] = useState(0)
  const [selectedCurrencies, setSelectedCurrencies] = useState<CurrencyHistoryData[]>([])
  const [isDashboardComponentActive, setDashboardComponentActive] = useState<boolean>(true)
  const [isHistoryComponentActive, setHistoryComponentActive] = useState<boolean>(false)

  useEffect(() => {
    setInitialCurrencies(rates)
  }, [rates])

  useEffect(() => {
    const firstValue: SelectedValue = rates.find((rate) => rate.code === fromCurrency)
    const secondValue: SelectedValue = rates.find((rate) => rate.code === toCurrency)

    if (firstValue && secondValue) {
      setExchangeRate(firstValue.mid / secondValue.mid)
      setConvertedValue((getParsedNumber(userValue) * exchangeRate).toFixed(2).toString())
      setSelectedCurrencies([
        { code: firstValue.code, table: firstValue.table } as CurrencyHistoryData,
        { code: secondValue.code, table: secondValue.table } as CurrencyHistoryData,
      ])
    }
  }, [rates, fromCurrency, toCurrency, userValue, exchangeRate])

  const onChangeValue = (inputElement: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = inputElement.target.value

    if (!value) {
      setUserValue('0')
    } else if (userInputRegex.test(value)) {
      setUserValue(getParsedNumber(value) >= 1 ? value.replace(/^0+/, '') : value)
    }
  }

  const onCurrencySwap = () => {
    const temporaryFromCurrencyKeeper = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temporaryFromCurrencyKeeper)
  }

  const setInitialCurrencies = (rates: ApiRate[]) => {
    setFromCurrency(findAndReturnCurrencyByCode(rates, initialSelectFromValue))
    setToCurrency(findAndReturnCurrencyByCode(rates, initialSelectToValue))
  }

  const onGoToHistoryButtonClick = () => {
    switchView(false, true)
  }

  const switchView = (setDashboardActive: boolean, setHistoryActive: boolean) => {
    setDashboardComponentActive(setDashboardActive)
    setHistoryComponentActive(setHistoryActive)
  }

  const switchOption = (state: any, action: any) => {
    switch (action.type) {
      case 'add':
        return { count: state.count + 1, color: 'green' }
      case 'substract':
        return { count: state.count - 1, color: 'red' }
      case 'reset':
        return action.setInitState
      default:
        return { count: state }
    }
  }

  const initState = { count: 0, color: 'gray' }

  // state - Declaring new state variable, called "counter" and initial count state
  const [counter, setCounter] = useReducer(switchOption, initState)

  return (
    <div>
      <p>
        Counter: <span style={{ color: counter.color }}> {counter.count} </span>
      </p>
      <button onClick={() => setCounter({ type: 'add' })}> +1</button>
      <button onClick={() => setCounter({ type: 'substract' })}> -1</button>
      <div>
        <button onClick={() => setCounter({ type: 'reset', setInitState: initState })}> reset</button>
      </div>

      {isDashboardComponentActive && (
        <div className="converter cc-container">
          <Helmet>
            <title>CConverter - {t('DashboardHelmetTitle')}</title>
          </Helmet>

          <div className="converter__info">
            <div className="converter__info__content">
              <Trans i18nKey="DashboardSectionInfo" components={{ paragraph: <p />, bold: <strong /> }}>
                <p>
                  Calculations are based on latest data provided by the <strong>National Bank of Poland</strong>.
                </p>
                <p>Values presented on the website form median of representative currencies.</p>
              </Trans>
              <p>
                <Trans i18nKey="DashboardSectionDate" values={{ date: date }}>
                  Last update: {{ date }}
                </Trans>
              </p>
            </div>
          </div>

          <div className="converter__calc__shadow" />

          <div className="converter__calc">
            <h2 className="converter__calc__header">{t('ConvertCurrencyCalculatorHeader')}</h2>
            <Spin spinning={!dataReady} delay={10}>
              <div className="converter__calc__group">
                <CurrencySelect
                  value={fromCurrency}
                  name="fromCurrency"
                  currencyRates={rates}
                  disabled={!dataReady}
                  onChange={setFromCurrency}
                />
                <label htmlFor="inputValue" className="sr-only">
                  Input Value
                </label>
                <Input
                  placeholder={inputPlaceholder}
                  value={userValue}
                  id="inputValue"
                  disabled={!dataReady}
                  onChange={onChangeValue}
                />
              </div>

              <div className="buttons">
                <Button
                  type="primary"
                  className="btn-swap cc-btn--gradient"
                  disabled={!fromCurrency || !toCurrency}
                  onClick={onCurrencySwap}
                >
                  <SwapOutlined rotate={90} className="btn-swap-icon" />
                </Button>

                <Button type="primary" className="btn-chart cc-btn--gradient" onClick={onGoToHistoryButtonClick}>
                  <LineChartOutlined className="btn-chart-icon" />
                  <span>{exchangeRate.toFixed(5)}</span>
                </Button>
              </div>

              <div className="converter__calc__group">
                <CurrencySelect
                  value={toCurrency}
                  name="toCurrency"
                  currencyRates={rates}
                  disabled={!dataReady}
                  onChange={setToCurrency}
                />
                <label htmlFor="outputValue" className="sr-only">
                  Output Value
                </label>
                <Input placeholder={inputPlaceholder} id="outputValue" value={converterValue} />
              </div>
            </Spin>
          </div>
        </div>
      )}
      {isHistoryComponentActive && (
        <ExchangeRateHistoryComponent selectedCurrencies={selectedCurrencies} backToDashboard={switchView} />
      )}
    </div>
  )
}

const findAndReturnCurrencyByCode = (rates: ApiRate[], currencyCode: string) => {
  return rates.find((rate) => rate.code === currencyCode)?.code || ''
}
