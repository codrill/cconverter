import { Button, Input } from 'antd'

import './Dashboard.scss'
import React, { useEffect, useState } from 'react'
import { CurrencySelect } from './CurrecySelectComponent/SelectComponent'
import { DateDisplay, RateDisplay } from './DateAndRateDisplayComponent/DateAndRateDisplayComponent'
import { initialSelectFromValue, initialSelectToValue, inputPlaceholder } from '../constants/Variables'
import { Helmet } from 'react-helmet'
import { getParsedNumber } from "../utils/number"
import { SwapOutlined } from "@ant-design/icons/lib";
import { Trans, useTranslation } from "react-i18next";

const userInputRegex = new RegExp('^\\d+([,.]\\d{0,2})?$')

type Props = {
    rates: ApiRate[]
    date: string
}

export type ApiRate = {
    code: string
    mid: number
    currency: string
}

type SelectedValue = ApiRate | undefined

export const Dashboard: React.FC<Props> = ({rates, date}) => {

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

    const prepareDateInformation = () => {
        return `${t('DashboardSectionDate')} ${date}`
    }

    const prepareExchangeRateInformation = () => {
        return `${t('DashboardSectionRateExchange')} ${exchangeRate.toFixed(5)}`
    }

    return (
        <div className="converter cc-container">

            <Helmet>
                <title>{t('DashboardHelmetTitle')}</title>
            </Helmet>

            <div className="converter__info">
                <div className="converter__info__content">
                    <p><Trans i18nKey='DashboardSectionFirstParagraph'/></p>
                    <p><Trans i18nKey='DashboardSectionSecondParagraph'/></p>
                    <p>{DateDisplay(prepareDateInformation())}</p>
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
                        onChange={setFromCurrency}
                        currencyRates={rates}
                    />
                    <Input
                        placeholder={inputPlaceholder}
                        value={userValue}
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
                        onChange={setToCurrency}
                        currencyRates={rates}
                    />
                    <Input
                      placeholder={inputPlaceholder}
                      value={converterValue}
                    />
                </div>
                <div className="converter__calc__rate">
                    <p>{RateDisplay(prepareExchangeRateInformation())}</p>
                </div>
            </div>
        </div>
    )
}

const findAndReturnCurrencyByCode = (rates: ApiRate[], currencyCode: string) => {
    return rates.find(rate => rate.code === currencyCode)?.code || ''
}

export default Dashboard
