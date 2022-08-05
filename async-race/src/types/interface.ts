import { Headers } from "./types";

export interface QueryOptions {
  method: string;
  headers?: Headers;
  body?: string;
}

export interface DataServer {
  name: string;
  color: string;
  id?: number;
}

// export interface NewCar {
//   name:
// }
