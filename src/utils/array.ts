export const sort = (values: Array<any>, propertyToSortBy = '') => {
  if (propertyToSortBy in values[0])
    return values.sort((a, b) => (a[propertyToSortBy].toLowerCase() < b[propertyToSortBy].toLowerCase() ? -1 : 1))

  return values.sort((a, b) => (a < b ? -1 : 1))
}
