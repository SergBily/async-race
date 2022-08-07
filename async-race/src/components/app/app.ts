import { DataServer } from "../../types/interface";
import { Appcontroller } from "../controller/controller";
import { Garage } from "../view/garage/garage";

export class App {
  private controller: Appcontroller;
  private readonly garage: Garage;

  constructor() {
    this.controller = new Appcontroller();
    this.garage = new Garage();
  }
  public async start(): Promise<void> {
    const response = (await this.controller.getGaragePage()) as Response;
    const data: DataServer[] = await response.json();
    const numPage: string = response.url.split("=")[1][0];
    const totalCars = response.headers.get("X-Total-Count") as string;

    this.garage.drawCars(data);
    this.garage.createPageGarage();
    this.garage.drawTotalCars("GET", totalCars);
    this.garage.drawNumPage(numPage);
  }
}
