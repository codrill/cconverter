import { ApiRate } from 'components/Dashboard/Dashboard'
import { polishCurrencyObject } from 'constants/PolishCurrencyObject'
import { CurrencyResponse } from 'services/CurrencyService'

import { sort } from './array'

export function addNewPropertyToTableObjectElement(objects: unknown[], newProperty: string, newPropertyValue: string) {
  //TODO: can we return new object here to ommit mutability and set proper typings?
  return objects.forEach((objectElement: any) => {
    objectElement[newProperty] = newPropertyValue
  })
}

export function returnPreparedCurrencyObject(data: CurrencyResponse): { rates: ApiRate[]; date: string } {
  data.currencyTableA.forEach((tableAElement) => {
    addNewPropertyToTableObjectElement(tableAElement.rates, 'table', tableAElement.table)
  })
  data.currencyTableB.forEach((tableBElement) => {
    addNewPropertyToTableObjectElement(tableBElement.rates, 'table', tableBElement.table)
  })
  return {
    rates: sort([...data.currencyTableA[0].rates, ...data.currencyTableB[0].rates, polishCurrencyObject], 'currency'),
    date: data.currencyTableA[0].effectiveDate,
  }
}
