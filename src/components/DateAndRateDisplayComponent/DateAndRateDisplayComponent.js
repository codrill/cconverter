import {EXCHANGE_DATE, EXCHANGE_RATE} from '../../constants/Translations/pl'

export const DateDisplay = (date) => `${EXCHANGE_DATE} ${date}`

export const RateDisplay = (exchangeRate) => `${EXCHANGE_RATE} ${exchangeRate.toFixed(5)}`

