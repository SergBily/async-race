import { Headers } from "./types";

export interface QueryOptions {
  method: string;
  headers?: Headers;
}

export interface DataServer {
  name: string;
  color: string;
  id: number;
}
