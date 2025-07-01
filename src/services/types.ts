export interface BasePageReq {
  current: number;
  size: number;
  reqData: any;
}
export interface BasePageRes<T> {
  list: T[];
  total: number;
}
