import {urlApi} from "../constants/CurrencyApiConstants";

export function getCurrencyValues() {
  return fetch(urlApi)
    .then(result => result.json())
}