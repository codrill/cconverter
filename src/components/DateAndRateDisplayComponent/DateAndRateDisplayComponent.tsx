import {EXCHANGE_DATE, EXCHANGE_RATE} from '../../constants/Translations/pl'

export const DateDisplay = (date: string) => `${EXCHANGE_DATE} ${date}`;

export const RateDisplay = (exchangeRate: number) => `${EXCHANGE_RATE} ${exchangeRate.toFixed(5)}`;

