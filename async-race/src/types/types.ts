export type Headers = {
  [index: string]: string;
};

export type ResponseHeader = string | null;

export type CountCars = (header: string, method?: string) => void;
