import { QueryOptions } from "../../types/interface";
import { ResponseHeader } from "../../types/types";

export class Loader {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://127.0.0.1:3000";
  }

  protected getResponse<T>(
    options: QueryOptions,
    endpoint: string,
    callback: (cars: T) => void,
    callbackTotalCars: (card: string, method?: string) => void,
    queryParams: string[] = []
  ): void {
    this.load(options, endpoint, callback, callbackTotalCars, queryParams);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) throw Error(res.statusText);
    console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
    return res;
  }

  makeUrl(endpoint: string, queryParams: string[] = []): string {
    let url = `${this.baseUrl}/${endpoint}`;
    url = queryParams.reduce(
      (acc, cur, index) =>
        queryParams.length === 1
          ? `${acc}/${cur}`
          : !index
          ? `${acc}?${cur}`
          : `${acc}&${cur}`,
      url
    );

    return url;
  }

  protected headerHandler(
    method: string,
    callback: (data: string, method?: string) => void,
    header?: ResponseHeader
  ): void {
    header ? callback(method, header) : callback(method);
  }

  private async load<T>(
    options: QueryOptions,
    endpoint: string,
    callback: (cars: T) => void,
    callbackTotalCars: (card: string, method?: string) => void,
    queryParams: string[] = []
  ): Promise<void> {
    try {
      const response: Response = await fetch(
        this.makeUrl(endpoint, queryParams),
        options
      );
      const header: ResponseHeader = response.headers.get("X-Total-Count");
      const result: T = await response.json();

      if (options.method === "DELETE") {
        callback(queryParams[0]);
      } else {
        callback(result);
      }

      this.headerHandler(options.method, callbackTotalCars, header);
    } catch (err: unknown) {
      console.error(err);
    }
  }
}
