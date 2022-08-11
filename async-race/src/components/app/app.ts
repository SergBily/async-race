import { DataServer } from "../../types/interface";
import { Appcontroller } from "../controller/controller";
import { LocalStorage } from "../localStorage/localStorage";
import { Garage } from "../view/garage/garage";
import { Pagination } from "../view/pagination";
import { Winners } from "../view/winners/winners";

export class App {
  private readonly controller: Appcontroller;
  private readonly garage: Garage;
  private readonly winners: Winners;
  private readonly locStorage: LocalStorage;
  private readonly pagination: Pagination;

  constructor() {
    this.controller = new Appcontroller();
    this.garage = new Garage();
    this.winners = new Winners();
    this.locStorage = new LocalStorage();
    this.pagination = new Pagination();
  }

  public start(): void {
    window.addEventListener("DOMContentLoaded", () => {
      const winnersPage = this.locStorage.getStorage("pWinners");
      winnersPage === "open" ? this.startWinnersPage() : this.startGaragePage();
    });
  }

  public async startGaragePage(): Promise<void> {
    const response = (await this.controller.getGaragePage()) as Response;
    const data: DataServer[] = await response.json();
    const numPage: string = (response.url.match(
      /page=\d*/
    ) as RegExpMatchArray)[0].split("=")[1];
    const totalCars = response.headers.get("X-Total-Count") as string;

    this.garage.drawCars(data);
    this.garage.createPageGarage();
    this.garage.drawTotalCars("GET", totalCars);
    this.pagination.drawNumPage(numPage, this.garage);
  }

  private startWinnersPage() {
    this.winners.createPageWinners();
  }
}
