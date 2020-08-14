import React, { useEffect, useState } from 'react'
import {Button, Input, Spin} from 'antd'
import { SwapOutlined } from "@ant-design/icons/lib";
import { Helmet } from 'react-helmet'
import { Trans, useTranslation } from "react-i18next";

import { initialSelectFromValue, initialSelectToValue, inputPlaceholder } from '../../constants/Variables'
import {getParsedNumber} from "../../utils/number";
import {CurrencySelect} from "../CurrecySelectComponent/SelectComponent";
import {RateDisplay} from "../DateAndRateDisplayComponent/DateAndRateDisplayComponent";

import './Dashboard.scss'

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
}

type SelectedValue = ApiRate | undefined

export const Dashboard: React.FC<Props> = ({rates, date, dataReady}) => {
    const {t} = useTranslation();

    const [fromCurrency, setFromCurrency] = useState('')
    const [toCurrency, setToCurrency] = useState('')
    const [userValue, setUserValue] = useState<string>('0')
    const [converterValue, setConvertedValue] = useState<string>('')
    const [exchangeRate, setExchangeRate] = useState(0)

    useEffect(() => {
        setInitialCurrencies(rates)
    }, [rates])

    useEffect(() => {
        const firstValue: SelectedValue = rates.find(rate => rate.code === fromCurrency);
        const secondValue: SelectedValue = rates.find(rate => rate.code === toCurrency);

        if (firstValue && secondValue) {
            setExchangeRate(firstValue.mid / secondValue.mid);
            setConvertedValue((getParsedNumber(userValue) * exchangeRate).toFixed(2).toString())
        }
    }, [rates, fromCurrency, toCurrency, userValue, exchangeRate])

    const onChangeValue = (inputElement: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = inputElement.target.value;

        if (!value) {
            setUserValue('0')
        } else if (userInputRegex.test(value)) {
            setUserValue(getParsedNumber(value) >= 1 ? value.replace(/^0+/, '') : value)
        }
    };

    const onCurrencySwap = () => {
        const temporaryFromCurrencyKeeper = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temporaryFromCurrencyKeeper)
    };

    const setInitialCurrencies = (rates: ApiRate[]) => {
        setFromCurrency(findAndReturnCurrencyByCode(rates, initialSelectFromValue))
        setToCurrency(findAndReturnCurrencyByCode(rates, initialSelectToValue))
    }

    const prepareExchangeRateInformation = () => {
        return `${t('DashboardSectionRateExchange')} ${exchangeRate.toFixed(5)}`
    }

    return (
        <div className="converter cc-container">

            <Helmet>
                <title>CConverter - {t('DashboardHelmetTitle')}</title>
            </Helmet>

            <div className="converter__info">
                <div className="converter__info__content">
                    <Trans i18nKey='DashboardSectionInfo' components={{ paragraph: <p />, bold: <strong /> }}>
                        <p>Calculations are based on latest data provided by the <strong>National Bank of Poland</strong>.</p>
                        <p>Values presented on the website form median of representative currencies.</p>
                    </Trans>
                    <p>
                        <Trans i18nKey='DashboardSectionDate' values={{date: date}}>
                            Last update: {{date}}
                        </Trans>
                    </p>
                </div>
            </div>

            <div className="converter__calc__shadow">
            </div>

            <div className="converter__calc">
                <h2 className="converter__calc__header">
                    {t('ConvertCurrencyCalculatorHeader')}
                </h2>
                 <Spin spinning={!dataReady} delay={10}>
                      <div className="converter__calc__group">
                          <CurrencySelect
                            value={fromCurrency}
                            name="fromCurrency"
                            currencyRates={rates}
                            disabled={!dataReady}
                            onChange={setFromCurrency}
                          />
                          <label htmlFor="inputValue" className="sr-only">Input Value</label>
                          <Input
                            placeholder={inputPlaceholder}
                            value={userValue}
                            id="inputValue"
                            disabled={!dataReady}
                            onChange={onChangeValue}
                          />
                      </div>

                      <Button
                        type="primary"
                        className="btn-swap cc-btn--gradient"
                        disabled={!fromCurrency || !toCurrency}
                        onClick={onCurrencySwap}
                      >
                          <SwapOutlined
                            rotate={90}
                            className="btn-swap-icon"
                          />
                      </Button>

                      <div className="converter__calc__group">
                          <CurrencySelect
                            value={toCurrency}
                            name="toCurrency"
                            currencyRates={rates}
                            disabled={!dataReady}
                            onChange={setToCurrency}
                          />
                          <label htmlFor="outputValue" className="sr-only">Output Value</label>
                          <Input
                            placeholder={inputPlaceholder}
                            id="outputValue"
                            value={converterValue}
                          />
                      </div>

                      <div className="converter__calc__rate">
                          <p>{RateDisplay(prepareExchangeRateInformation())}</p>
                      </div>
                  </Spin>
            </div>
        </div>
    )
}

const findAndReturnCurrencyByCode = (rates: ApiRate[], currencyCode: string) => {
    return rates.find(rate => rate.code === currencyCode)?.code || ''
}

export default Dashboard
