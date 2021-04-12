export const sort = <T>(values: Record<string, T>[], propertyToSortBy = ''): Record<string, T>[] => {
  if (propertyToSortBy in values[0])
    return values.sort((a, b) => {
      return String(a[propertyToSortBy]).toLowerCase() < String(b[propertyToSortBy]).toLowerCase() ? -1 : 1
    })

  return values.sort((a, b) => (a < b ? -1 : 1))
}
