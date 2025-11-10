export const jsonToCsv = (items: Record<string, unknown>[]) =>
  items
    .map((item) =>
      Object.values(item)
        .map((value) =>
          value === undefined || value === null
            ? ''
            : JSON.stringify(value).replaceAll(',', ' ')
        )
        .join(',')
    )
    .join('\n')

export const jsonToCsvHref = (items: Record<string, unknown>[]) =>
  `data:text/plain;charset=utf-8,${encodeURIComponent(jsonToCsv(items))}`
