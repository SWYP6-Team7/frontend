export function splitByKeyword(keyword: string, result: string) {
  let regex = new RegExp(`(${keyword})`, 'g')
  let splitResult = result.split(regex)

  return splitResult.map(str => {
    return {
      match: str === keyword,
      str: str
    }
  })
}
