export function removeEmptyFields(data: any) {
  Object.keys(data).forEach((key) => {
    if (data[key] === '' || data[key] == null) {
      delete data[key]
    }
  })
}
