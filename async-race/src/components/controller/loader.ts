import { QueryOptions } from "../../types/interface";

export class Loader {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://127.0.0.1:3000";
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(endpoint: string, queryParams: string[] = []): string {
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

  protected async load(
    options: QueryOptions,
    endpoint: string,
    queryParams: string[] = []
  ): Promise<void | Response> {
    try {
      const response: Response = await fetch(
        this.makeUrl(endpoint, queryParams),
        options
      );
      this.errorHandler(response);
      return response;
    } catch (err: unknown) {
      console.error(err);
    }
  }
}
