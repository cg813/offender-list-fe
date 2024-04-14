export const jsonToCsv = (rows: any[]): string => {
  let fileParsed = ''
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    let line = ''
    for (const key in row) {
      if (line !== '') {
        line += ','
      }
      line += (row as any)[key]
    }
    fileParsed += line + '\r\n'
  }
  return fileParsed
}

export const EMAIL_SUPPORT = 'info@offenderlist.us'

export const checkIsAvailableData = (row: any): boolean => {
  if (!row[0] || !row[1]) {
    return false
  }
  // Must have at least one field
  if (!row[2] && !row[3] && !row[4]) {
    return false
  }
  return true
}

export const sleep = (delay: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, delay))
