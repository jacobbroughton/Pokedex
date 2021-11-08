export function parseStringToFloat(string: string) {
  return parseFloat(string.replace('kg', '').replace(/\s/g, ''))
}