import { DataServer } from "./interface";

export type Headers = {
  [index: string]: string;
};

export type ResponseHeader = string | null;

export type CountCars = (header: string, method?: string) => void;

export type PaginationStorage = {
  [index: string]: number;
};

export type CarOrCars = HTMLDivElement[] | NodeListOf<HTMLDivElement>;

export type EngineData = {
  velocity: number;
  distance: number;
};

export type AnimationFame = {
  [index: string]: number;
};

export type ResponseT = Response | Response[];

export type DataServerT = DataServer | EngineData[];
