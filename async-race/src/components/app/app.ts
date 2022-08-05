import { DataServer } from "../../types/interface";
import { Appcontroller } from "../controller/controller";
import { Garage } from "../view/garage/garage";

export class App {
  controller: Appcontroller;
  private readonly garage: Garage;

  constructor() {
    this.controller = new Appcontroller();
    this.garage = new Garage();
  }
  public start(): void {
    this.controller.getGaragePage((data: DataServer[]) =>
      this.garage.createPageGarage(data)
    );
  }
}
