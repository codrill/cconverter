import { AvailableTables } from '../components/dashboard/dashboard'

const urlNbpApi = 'https://api.nbp.pl/api'

export const urlExchangeRates = `${urlNbpApi}/exchangerates/rates`

export const urlApiNBPTableA = `${urlNbpApi}/exchangerates/tables/A`
export const urlApiNBPTableB = `${urlNbpApi}/exchangerates/tables/B`

export const urlApiNBPMaxHistory = (currencyTable: AvailableTables, currencyCode: string): string => {
  return `${urlExchangeRates}/${currencyTable}/${currencyCode}/last/90`
}
