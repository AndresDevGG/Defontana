export const cloneDeep = <T>(data: any): T => {
  return JSON.parse(JSON.stringify(data)) as T;
};
