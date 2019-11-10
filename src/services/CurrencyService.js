import {urlApiNBPTableA, urlApiNBPTableB} from "../constants/CurrencyApiConstants";
import {polishCurrency} from '../constants/polishCurrency'

export const getCurrencyValues = () => {

  return Promise.all([
    fetch(urlApiNBPTableA).then(result => result.json()),
    fetch(urlApiNBPTableB).then(result => result.json()),
  ])
  .then(tables =>  {
    return {
      rates: [...tables[0][0].rates, ...tables[1][0].rates, polishCurrency],
      date: tables[0][0].effectiveDate
    }
  })
};
