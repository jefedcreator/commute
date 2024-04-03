export const resizeArray = (array: any[]): Array<any> => {
  const chunkSize = 3;
  const result: any[] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk: any = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};
