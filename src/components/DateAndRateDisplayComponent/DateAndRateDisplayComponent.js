import {EXCHANGE_RATE, FOR_DATE} from '../../constants/Translations/en'

export const DateAndRateDisplay = (exchangeRate, date) => {
  return (
      `${EXCHANGE_RATE} ${exchangeRate.toFixed(5)} ${FOR_DATE} ${date}`
  )
}
