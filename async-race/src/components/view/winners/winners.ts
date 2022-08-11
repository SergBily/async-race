import {
  BtnSortEnum,
  SortOrderEnum,
  SortThingEnum,
  UrlPage,
} from "../../../types/enum";
import { DataServer, DataServerWins } from "../../../types/interface";
import { App } from "../../app/app";
import { Appcontroller } from "../../controller/controller";
import { LocalStorage } from "../../localStorage/localStorage";
import { Pagination } from "../pagination";

export class Winners {
  public controller: Appcontroller;
  private locStorage: LocalStorage;
  private paginationBtns: Pagination;
  private readonly wrapper: HTMLDivElement;
  private readonly titlePage: HTMLHeadingElement;
  private readonly totalWinners: HTMLSpanElement;
  private readonly btnPages: HTMLDivElement;
  private readonly btnGarage: HTMLButtonElement;
  private readonly btnWinners: HTMLButtonElement;
  protected readonly caption: HTMLTableRowElement;
  private readonly table: HTMLTableElement;
  private readonly titleWins: HTMLHeadElement;
  private readonly titleNum: HTMLSpanElement;
  private curCar: DataServer;
  private bodyHtml;
  public curPage: number;

  constructor() {
    this.controller = new Appcontroller();
    this.locStorage = new LocalStorage();
    this.paginationBtns = new Pagination();
    this.wrapper = document.createElement("div");
    this.titlePage = document.createElement("h1");
    this.totalWinners = document.createElement("span");
    this.btnPages = document.createElement("div");
    this.btnGarage = document.createElement("button");
    this.btnWinners = document.createElement("button");
    this.table = document.createElement("table");
    this.caption = document.createElement("tr");
    this.titleWins = document.createElement("h2");
    this.titleNum = document.createElement("span");
    this.curCar = { name: "", color: "" };
    this.bodyHtml = document.querySelector(".body") as HTMLBodyElement;
    this.curPage = 1;
  }

  public createPageWinners(): void {
    this.locStorage.setStorage("pWinners", "open");
    this.writePageToStorage();
    this.removeGaragePage();
    this.wrapper.classList.add("wrapper");
    this.titlePage.classList.add("title__page");
    this.titlePage.innerText = "Winners(";
    this.totalWinners.classList.add("total__cars");
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
    this.titlePage.appendChild(this.totalWinners);
    this.titleWins.appendChild(this.titleNum);
    this.btnPages.append(this.btnGarage, this.btnWinners);
    this.table.append(this.caption);
    this.getdataWins();
    this.wrapper.append(
      this.titlePage,
      this.btnPages,
      this.titleWins,
      this.table,
      this.paginationBtns.createPaginationPage()
    );
    this.bodyHtml.appendChild(this.wrapper);
    this.listeners();
    this.paginationBtns.addListeners(this);
  }

  private createTableCaption(): void {
    const number: HTMLTableCellElement = document.createElement("th"),
      car: HTMLTableCellElement = document.createElement("th"),
      name: HTMLTableCellElement = document.createElement("th"),
      wins: HTMLTableCellElement = document.createElement("th"),
      best: HTMLTableCellElement = document.createElement("th"),
      winsArrow: HTMLParagraphElement = document.createElement("p"),
      bestArrow: HTMLParagraphElement = document.createElement("p");

    this.caption.classList.add("table__caption");

    number.classList.add("caption");
    number.innerText = "Number";

    car.classList.add("caption");
    car.innerText = "Car";

    name.classList.add("caption");
    name.innerText = "Name";

    wins.classList.add("caption");
    wins.innerText = "Wins";
    wins.setAttribute("data-name", "wins");
    winsArrow.classList.add("wins-arrow");

    best.classList.add("caption");
    best.innerText = "Best time (s)";
    best.setAttribute("data-name", "best");
    bestArrow.classList.add("best-arrow");
    bestArrow.innerText = "↑";

    wins.appendChild(winsArrow);
    best.appendChild(bestArrow);
    this.caption.append(number, car, name, wins, best);
  }

  public drawCars(data: DataServerWins[]): void {
    this.removeWinners();
    this.table.appendChild(this.caption);

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

      cellName.classList.add("cell");
      cellName.innerText = `${this.curCar.name}`;

      cellWins.classList.add("cell");
      cellWins.innerText = `${row.wins}`;

      cellBest.classList.add("cell");
      cellBest.innerText = `${row.time}`;

      cellCar.appendChild(carImg);
      body.append(cellNumber, cellCar, cellName, cellWins, cellBest);
      this.table.append(body);
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
    const response = (await this.controller.getWiners(
        SortThingEnum.best,
        SortOrderEnum.up
      )) as Response,
      data: DataServerWins[] = await response.json(),
      totalWins = response.headers.get("X-Total-Count") as string;

    this.drawCars(data);
    this.totalWinners.innerText = `${totalWins})`;
    if (+totalWins > 10) {
      const next = document.querySelector(
        ".pagination__next"
      ) as HTMLButtonElement;
      next.classList.add("pagination__activ");
      next.disabled = false;
    }
  }

  private removeGaragePage(): void {
    const body = document.querySelector(".body") as HTMLBodyElement;

    while (body.firstElementChild) {
      body.firstElementChild.remove();
    }
  }

  private removeWinners(): void {
    const table = document.querySelector(".table") as HTMLTableElement;

    while (table.firstElementChild) {
      table.firstElementChild.remove();
    }
  }

  private writePageToStorage(): void {
    this.locStorage.setStorage(UrlPage.winners, "true");
  }

  private listeners(): void {
    const startPageGarage = new App();
    this.btnGarage.addEventListener("click", () => {
      startPageGarage.startGaragePage();
    });

    this.caption.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).dataset.name as string;
      this.sortWiners(btn);
    });
  }

  public async sortWiners(btn: string) {
    const winsArrow = document.querySelector(
        ".wins-arrow"
      ) as HTMLParagraphElement,
      bestArrow = document.querySelector(".best-arrow") as HTMLParagraphElement;

    let response: Response, data: DataServerWins[];

    switch (btn) {
      case BtnSortEnum.wins:
        if (winsArrow.innerText === "↑") {
          winsArrow.innerText = "↓";
          bestArrow.innerText = "";
          response = (await this.controller.getWiners(
            SortThingEnum.wins,
            SortOrderEnum.down
          )) as Response;
          this.saveSortToStorage(SortThingEnum.wins, SortOrderEnum.down);
        } else {
          winsArrow.innerText = "↑";
          bestArrow.innerText = "";
          response = (await this.controller.getWiners(
            SortThingEnum.wins,
            SortOrderEnum.up
          )) as Response;
          this.saveSortToStorage(SortThingEnum.wins, SortOrderEnum.up);
        }
        data = await response.json();
        this.drawCars(data);
        break;

      case BtnSortEnum.best:
        if (bestArrow.innerText === "↑") {
          bestArrow.innerText = "↓";
          winsArrow.innerText = "";
          response = (await this.controller.getWiners(
            SortThingEnum.best,
            SortOrderEnum.down
          )) as Response;
          this.saveSortToStorage(SortThingEnum.best, SortOrderEnum.down);
        } else {
          bestArrow.innerText = "↑";
          winsArrow.innerText = "";
          response = (await this.controller.getWiners(
            SortThingEnum.best,
            SortOrderEnum.up
          )) as Response;
          this.saveSortToStorage(SortThingEnum.best, SortOrderEnum.up);
        }
        data = await response.json();
        this.drawCars(data);
        break;
    }
  }

  private saveSortToStorage(sort: string, order: string): void {
    const data: string = JSON.stringify([sort, order]);
    this.locStorage.setStorage("sort", data);
  }
}
