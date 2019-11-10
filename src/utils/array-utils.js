export const sort = (values) => {
  return values.sort(((a, b) => a.currency.toLowerCase() > b.currency.toLowerCase() ? 1 : -1 ))
}
