export function chunkArray(array: any[]) {
  const result: any[] = [];
  for (let i = 0; i < array.length; i += 3) {
    result.push(array.slice(i, i + 3));
  }
  return result;
}
