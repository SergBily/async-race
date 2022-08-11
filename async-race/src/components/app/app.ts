import { DataServer } from "../../types/interface";
import { Appcontroller } from "../controller/controller";
import { LocalStorage } from "../localStorage/localStorage";
import { Garage } from "../view/garage/garage";
import { Winners } from "../view/winners/winners";

export class App {
  private readonly controller: Appcontroller;
  private readonly garage: Garage;
  private readonly winners: Winners;
  private readonly locStorage: LocalStorage;

  constructor() {
    this.controller = new Appcontroller();
    this.garage = new Garage();
    this.winners = new Winners();
    this.locStorage = new LocalStorage();
  }

  public start(): void {
    window.addEventListener("DOMContentLoaded", () => {
      const winnersPage = this.locStorage.getStorage("pageWinners");
      winnersPage === "open" ? this.startWinnersPage() : this.startGaragePage();
    });
  }

  public async startGaragePage(): Promise<void> {
    const response = (await this.controller.getGaragePage()) as Response;
    const data: DataServer[] = await response.json();
    const numPage: string = response.url.split("=")[1][0];
    const totalCars = response.headers.get("X-Total-Count") as string;

    this.garage.drawCars(data);
    this.garage.createPageGarage();
    this.garage.drawTotalCars("GET", totalCars);
    this.garage.drawNumPage(numPage);
  }

  private startWinnersPage() {
    this.winners.createPageWinners();
  }
}
