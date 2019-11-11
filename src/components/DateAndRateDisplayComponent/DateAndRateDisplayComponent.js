import {EXCHANGE_RATE, FOR_DATE} from '../../constants/Translations/en'
import {ExchangeRateComponent} from '../ExchangeRateComponent/ExchangeRateComponent'
import {DateComponent} from '../DateComponent/DateComponent'

export const DateAndRateDisplay = (exchangeRate, date) => {
  return (
      `${EXCHANGE_RATE} ${ExchangeRateComponent(exchangeRate)} ${FOR_DATE} ${DateComponent(date)}`
  )
}
