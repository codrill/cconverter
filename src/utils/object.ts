import { sort } from "./array";
import { polishCurrencyObject } from "../constants/PolishCurrencyObject";
import { CurrencyResponse } from "../services/CurrencyService";

export function addNewPropertyToTableObjectElement(object: [], newProperty: string, newPropertyValue: string) {
    return object.forEach((objectElement: any) => {
        objectElement[newProperty] = newPropertyValue
    })
}

export function returnPreparedCurrencyObject(data: CurrencyResponse) {
    data.currencyTableA.forEach((tableAElement: any) => {
        addNewPropertyToTableObjectElement(tableAElement.rates, 'table', tableAElement.table)
    })
    data.currencyTableB.forEach((tableBElement: any) => {
        addNewPropertyToTableObjectElement(tableBElement.rates, 'table', tableBElement.table)
    })
    return {
        rates: sort([...data.currencyTableA[0].rates, ...data.currencyTableB[0].rates, polishCurrencyObject], 'currency'),
        date: data.currencyTableA[0].effectiveDate
    }
}