export const exportFile = (value: string, fileName: string) => {
  const element = document.createElement('a')

  element.setAttribute('href', value)
  element.setAttribute('download', fileName)
  document.body.appendChild(element)
  element.click()
  element.remove()
}
