import {urlApi} from "../constants/CurrencyApiConstants";

export const getCurrencyValues = () => {
  return fetch(urlApi)
    .then(result => result.json())
};