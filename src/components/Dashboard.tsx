import { Button, Input } from 'antd'

import './Dashboard.scss'
import React, { useEffect, useState } from 'react'
import { CurrencySelect } from './CurrecySelectComponent/SelectComponent'
import { RateDisplay } from './DateAndRateDisplayComponent/DateAndRateDisplayComponent'
import { initialSelectFromValue, initialSelectToValue, inputPlaceholder } from '../constants/Variables'
import { Helmet } from 'react-helmet'
import { getParsedNumber } from "../utils/number"
import { LineChartOutlined, SwapOutlined } from "@ant-design/icons/lib";
import { CurrencyHistoryData } from "../App";
import { Trans, useTranslation } from "react-i18next";
import { History } from "./ExchangeRateHistoryComponent/ExchangeRateHistoryComponent";

const userInputRegex = new RegExp('^\\d+([,.]\\d{0,2})?$')

type Props = {
    rates: ApiRate[]
    date: string
}

export type ApiRate = {
    code: string
    mid: number
    currency: string
    table: string
}

type SelectedValue = ApiRate | undefined

export const Dashboard: React.FC<Props> = ({rates, date}) => {

    const {t} = useTranslation();

    const [fromCurrency, setFromCurrency] = useState('')
    const [toCurrency, setToCurrency] = useState('')
    const [userValue, setUserValue] = useState<string>('0')
    const [converterValue, setConvertedValue] = useState<string>('')
    const [exchangeRate, setExchangeRate] = useState(0)
    const [selectedCurrencies, setSelectedCurrencies] = useState<CurrencyHistoryData[]>([])
    const [isDashboardComponentActive, setDashbordComponentActive] = useState<boolean>(true)
    const [isHistoryComponentActive, setHistoryComponentActive] = useState<boolean>(false)

    useEffect(() => {
        setInitialCurrencies(rates)
    }, [rates])

    useEffect(() => {
        const firstValue: SelectedValue = rates.find(rate => rate.code === fromCurrency);
        const secondValue: SelectedValue = rates.find(rate => rate.code === toCurrency);

        if (firstValue && secondValue) {
            setExchangeRate(firstValue.mid / secondValue.mid);
            setConvertedValue((getParsedNumber(userValue) * exchangeRate).toFixed(2).toString())
            setSelectedCurrencies([
                {code: firstValue.code, table: firstValue.table} as CurrencyHistoryData,
                {code: secondValue.code, table: secondValue.table} as CurrencyHistoryData
            ])
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

   const onGoToHistoryButtonClick = () => {
        switchView(false, true)
    }

    const switchView = (setDashboardActive: boolean, setHistoryActive: boolean) => {
        setDashbordComponentActive(setDashboardActive)
        setHistoryComponentActive(setHistoryActive)
    }


    return (
        <div>
            {isDashboardComponentActive &&
            <div className="converter cc-container">

                <Helmet>
                    <title>CConverter - {t('DashboardHelmetTitle')}</title>
                </Helmet>

                <div className="converter__info">
                    <div className="converter__info__content">
                        <Trans i18nKey='DashboardSectionInfo' components={{paragraph: <p/>, bold: <strong/>}}>
                            <p>Calculations are based on latest data provided by the <strong>National Bank of
                                Poland</strong>.</p>
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

                    <div className="converter__calc__group">
                        <CurrencySelect
                            value={fromCurrency}
                            name="fromCurrency"
                            onChange={setFromCurrency}
                            currencyRates={rates}
                        />
                        <label htmlFor="inputValue" className="sr-only">Input Value</label>
                        <Input
                            placeholder={inputPlaceholder}
                            value={userValue}
                            id="inputValue"
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
                            <SwapOutlined
                                rotate={90}
                                className="btn-swap-icon"
                            />
                        </Button>

                        <Button type="primary"
                                className="btn-chart cc-btn--gradient"
                                onClick={onGoToHistoryButtonClick}>

                            <LineChartOutlined className="btn-chart-icon"/>
                            <span>{exchangeRate.toFixed(5)}</span>
                            
                        </Button>
                    </div>

                    <div className="converter__calc__group">
                        <CurrencySelect
                            value={toCurrency}
                            name="toCurrency"
                            onChange={setToCurrency}
                            currencyRates={rates}
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
                </div>
            </div>
            }

            {isHistoryComponentActive && <History selectedCurrencies={selectedCurrencies} backToDashboard={switchView}/>}
        </div>

    )
}

const findAndReturnCurrencyByCode = (rates: ApiRate[], currencyCode: string) => {
    return rates.find(rate => rate.code === currencyCode)?.code || ''
}