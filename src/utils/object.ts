import { ApiRate } from 'components/dashboard/dashboard'
import { polishCurrencyObject } from 'constants/polishCurrencyObject'
import { CurrencyResponse } from 'services/currencyService'

import { sort } from './array'

export function addNewPropertyToTableObjectElement(
  objects: Record<string, unknown>[],
  newProperty: string,
  newPropertyValue: string,
): void {
  //TODO: can we return new object here to omit mutability and set proper typings?
  objects.forEach((objectElement) => {
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
