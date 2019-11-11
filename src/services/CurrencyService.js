import {urlApiNBPTableA, urlApiNBPTableB} from "../constants/CurrencyApiConstants"
import {polishCurrencyObject} from '../constants/PolishCurrencyObject'
import {sort} from '../utils/array-utils'

export const getCurrencyValues = () => {

  return Promise.all([
    fetch(urlApiNBPTableA).then(result => result.json()),
    fetch(urlApiNBPTableB).then(result => result.json()),
  ])
  .then(tables => {
    return {
      rates: sort([...tables[0][0].rates, ...tables[1][0].rates, polishCurrencyObject], 'currency'),
      date: tables[0][0].effectiveDate
    }
  })
}
