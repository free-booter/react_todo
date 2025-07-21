export interface BasePageReq {
  current: number;
  size: number;
}
export interface BasePageRes<T> {
  list: T[];
  total: number;
  totalPages: number;
  current: number;
  size: number;
}
