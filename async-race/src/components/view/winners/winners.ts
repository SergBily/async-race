import { UrlPage } from "../../../types/enum";
import { DataServer, DataServerWins } from "../../../types/interface";
import { Appcontroller } from "../../controller/controller";
import { LocalStorage } from "../../localStorage/localStorage";
import { Pagination } from "../pagination";

export class Winners {
  protected controller: Appcontroller;
  private locStorage: LocalStorage;
  private paginationPage: Pagination;
  private readonly wrapper: HTMLDivElement;
  private readonly titlePage: HTMLHeadingElement;
  private readonly totalCars: HTMLSpanElement;
  private readonly btnPages: HTMLDivElement;
  private readonly btnGarage: HTMLButtonElement;
  private readonly btnWinners: HTMLButtonElement;
  private readonly caption: HTMLTableRowElement;
  private readonly table: HTMLTableElement;
  private readonly titleWins: HTMLHeadElement;
  private readonly titleNum: HTMLSpanElement;
  private curCar: DataServer;
  private bodyHtml;

  constructor() {
    this.controller = new Appcontroller();
    this.locStorage = new LocalStorage();
    this.paginationPage = new Pagination();
    this.wrapper = document.createElement("div");
    this.titlePage = document.createElement("h1");
    this.totalCars = document.createElement("span");
    this.btnPages = document.createElement("div");
    this.btnGarage = document.createElement("button");
    this.btnWinners = document.createElement("button");
    this.table = document.createElement("table");
    this.caption = document.createElement("tr");
    this.titleWins = document.createElement("h2");
    this.titleNum = document.createElement("span");
    this.curCar = { name: "", color: "" };
    this.bodyHtml = document.querySelector(".body") as HTMLBodyElement;
  }

  public createPageWinners(): void {
    this.writePageToStorage();
    this.removeGaragePage();
    this.wrapper.classList.add("wrapper");
    this.titlePage.classList.add("title__page");
    this.titlePage.innerText = "Winners(";
    this.totalCars.classList.add("total__winners");
    this.btnPages.classList.add("btn__pages");

    this.btnGarage.classList.add("btn", "btn__garage");
    this.btnGarage.textContent = "TO GARAGE";
    this.btnGarage.setAttribute("data-name", "garage");

    this.btnWinners.classList.add("btn", "btn__winners");
    this.btnWinners.textContent = "TO WINNERS";
    this.btnWinners.setAttribute("data-name", "winners");

    this.titleWins.classList.add("title__race");
    this.titleWins.innerText = "Page #";

    this.titleNum.classList.add("title__num");
    this.titleNum.innerText = "1";

    this.table.classList.add("table");

    this.createTableCaption();
    this.titleWins.appendChild(this.titleNum);
    this.btnPages.append(this.btnGarage, this.btnWinners);
    this.table.append(this.caption);
    this.getdataWins();
    this.wrapper.append(
      this.titlePage,
      this.btnPages,
      this.titleWins,
      this.table,
      this.paginationPage.createPaginationPage()
    );
    this.bodyHtml.appendChild(this.wrapper);
  }

  private createTableCaption(): void {
    const number: HTMLTableCellElement = document.createElement("th"),
      car: HTMLTableCellElement = document.createElement("th"),
      name: HTMLTableCellElement = document.createElement("th"),
      wins: HTMLTableCellElement = document.createElement("th"),
      best: HTMLTableCellElement = document.createElement("th");

    this.caption.classList.add("table__caption");

    number.classList.add("caption");
    number.innerText = "Number";

    car.classList.add("caption");
    car.innerText = "Car";

    name.classList.add("caption");
    name.innerText = "Name";

    wins.classList.add("caption");
    wins.innerText = "Wins";

    best.classList.add("caption");
    best.innerText = "Best time (s)";

    this.caption.append(number, car, name, wins, best);
  }

  private createBodyTable(data: DataServerWins[]): void {
    const carsWin: HTMLTableRowElement[] = [];

    data.forEach(async (row, index) => {
      const body: HTMLTableRowElement = document.createElement("tr"),
        cellNumber: HTMLTableCellElement = document.createElement("td"),
        cellCar: HTMLTableCellElement = document.createElement("td"),
        cellName: HTMLTableCellElement = document.createElement("td"),
        cellWins: HTMLTableCellElement = document.createElement("td"),
        cellBest: HTMLTableCellElement = document.createElement("td"),
        carImg: SVGSVGElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
      await this.getGoalCar(row.id.toString());

      body.classList.add("table__body");
      cellNumber.classList.add("cell");
      cellNumber.innerHTML = `${index + 1}`;

      cellCar.classList.add("cell");
      carImg.style.fill = this.curCar.color;
      carImg.setAttribute("width", "50");
      carImg.setAttribute("height", "30");
      carImg.insertAdjacentHTML(
        "beforeend",
        "<use xlink:href='./assets/img/sprite.svg#car'></use>"
      );
      console.log(this.curCar);

      cellName.classList.add("cell");
      cellName.innerText = `${this.curCar.name}`;

      cellWins.classList.add("cell");
      cellWins.innerText = `${row.wins}`;

      cellBest.classList.add("cell");
      cellBest.innerText = `${row.time}`;

      cellCar.appendChild(carImg);
      body.append(cellNumber, cellCar, cellName, cellWins, cellBest);
      this.table.append(body);

      carsWin.push(body);
    });
  }

  private async getGoalCar(id: string): Promise<void> {
    const response = (await this.controller.getCarOrWinners(
        id,
        UrlPage.garage
      )) as Response,
      data: DataServer = await response.json();

    this.curCar = data;
  }

  private async getdataWins(): Promise<void> {
    const response = (await this.controller.getWiners()) as Response,
      data: DataServerWins[] = await response.json(),
      totalWins = response.headers.get("X-Total-Count") as string;
    console.log(data);
    this.createBodyTable(data);
    this.titlePage.innerText = `${this.titlePage.innerText}${totalWins})`;
  }

  private removeGaragePage(): void {
    const body = document.querySelector(".body") as HTMLBodyElement;

    while (body.firstElementChild) {
      body.firstElementChild.remove();
    }
  }

  private writePageToStorage(): void {
    this.locStorage.setStorage(UrlPage.winners, "true");
  }
}
