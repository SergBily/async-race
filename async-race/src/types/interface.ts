export interface QueryOptions {
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

export interface DataServer {
  name: string;
  color: string;
  id?: number;
}

export interface DataServerWins {
  wins: number;
  time: number;
  id: number;
}
