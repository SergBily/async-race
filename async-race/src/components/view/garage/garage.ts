import { DataServer } from "../../../types/interface";
import { EventListeners } from "../../controller/eventListeners";
import { Car } from "./car";

export class Garage {
  protected eventListener: EventListeners;
  private readonly car: Car;
  private readonly body;
  private readonly wrapper: HTMLDivElement;
  private readonly titlePage: HTMLHeadingElement;
  private readonly totalCars: HTMLSpanElement;
  private readonly btnPages: HTMLDivElement;
  private readonly btnGarage: HTMLButtonElement;
  private readonly btnWinners: HTMLButtonElement;
  private readonly carControl: HTMLDivElement;
  private readonly createCarNew: HTMLDivElement;
  private readonly inputCreateCar: HTMLInputElement;
  private readonly inputCreateColor: HTMLInputElement;
  private readonly btnCreateCar: HTMLButtonElement;
  private readonly carUpdate: HTMLDivElement;
  private readonly inputUpdateCar: HTMLInputElement;
  private readonly inputUpdateColor: HTMLInputElement;
  private readonly btnUpdateCar: HTMLButtonElement;
  private readonly garageControl: HTMLDivElement;
  private readonly btnRace: HTMLButtonElement;
  private readonly btnReset: HTMLButtonElement;
  private readonly btnGenerate: HTMLButtonElement;
  private readonly titleRace: HTMLHeadingElement;
  private readonly titleNum: HTMLSpanElement;
  private readonly pagination: HTMLDivElement;
  private readonly btnPrev: HTMLButtonElement;
  private readonly btnNext: HTMLButtonElement;

  constructor() {
    this.eventListener = new EventListeners();
    this.car = new Car();
    this.body = document.querySelector(".body") as HTMLBodyElement;
    this.wrapper = document.createElement("div");
    this.titlePage = document.createElement("h1");
    this.totalCars = document.createElement("span");
    this.btnPages = document.createElement("div");
    this.btnGarage = document.createElement("button");
    this.btnWinners = document.createElement("button");
    this.carControl = document.createElement("div");
    this.createCarNew = document.createElement("div");
    this.inputCreateCar = document.createElement("input");
    this.inputCreateColor = document.createElement("input");
    this.btnCreateCar = document.createElement("button");
    this.carUpdate = document.createElement("div");
    this.inputUpdateCar = document.createElement("input");
    this.inputUpdateColor = document.createElement("input");
    this.btnUpdateCar = document.createElement("button");
    this.garageControl = document.createElement("div");
    this.btnRace = document.createElement("button");
    this.btnReset = document.createElement("button");
    this.btnGenerate = document.createElement("button");
    this.titleRace = document.createElement("h2");
    this.titleNum = document.createElement("span");
    this.pagination = document.createElement("div");
    this.btnPrev = document.createElement("button");
    this.btnNext = document.createElement("button");
  }

  public createPageGarage(cars: DataServer[]): void {
    this.wrapper.classList.add("wrapper");
    this.titlePage.classList.add("title__page");
    this.titlePage.innerText = "Garage(";
    this.totalCars.classList.add("total__cars");

    this.btnPages.classList.add("btn__pages");

    this.btnGarage.classList.add("btn", "btn__garage");
    this.btnGarage.textContent = "TO GARAGE";

    this.btnWinners.classList.add("btn", "btn__winners");
    this.btnWinners.textContent = "TO WINNERS";

    this.createCarControl();
    this.createPaginationGarage();
    this.car.drawCars(cars);

    this.titleRace.classList.add("title__race");
    this.titleRace.innerText = "Page #";

    this.titleNum.classList.add("title__num");
    this.titleNum.innerText = "1";

    this.titlePage.appendChild(this.totalCars);
    this.btnPages.append(this.btnGarage, this.btnWinners);
    this.titleRace.appendChild(this.titleNum);
    this.wrapper.append(
      this.titlePage,
      this.btnPages,
      this.carControl,
      this.titleRace,
      this.car.members,
      this.pagination
    );
    this.body.appendChild(this.wrapper);
    this.eventListener.listenCarsControl(this.carControl);
    this.eventListener.listenCar(this.car.members);
  }

  private createCarControl(): void {
    this.carControl.classList.add("car__control");
    this.createCarNew.classList.add("car__new");

    this.inputCreateCar.classList.add("car__input");
    this.inputCreateCar.type = "text";
    this.inputCreateCar.autofocus = true;
    this.inputCreateCar.autocomplete = "on";
    this.inputCreateCar.placeholder = "create auto";

    this.inputCreateColor.classList.add("car__color");
    this.inputCreateColor.type = "color";
    this.inputCreateColor.value = "#f41049";

    this.btnCreateCar.classList.add("btn", "btn__car", "car__create");
    this.btnCreateCar.innerText = "CREATE";

    this.carUpdate.classList.add("car__update");

    this.inputUpdateCar.classList.add("car__input");
    this.inputUpdateCar.type = "text";
    this.inputUpdateCar.autocomplete = "on";
    this.inputUpdateCar.placeholder = "update auto";

    this.inputUpdateColor.classList.add("car__color");
    this.inputUpdateColor.type = "color";
    this.inputUpdateColor.value = "#2819f5";

    this.btnUpdateCar.classList.add("btn", "btn__car", "car__updates");
    this.btnUpdateCar.innerText = "UPDATE";

    this.garageControl.classList.add("garage__control");

    this.btnRace.classList.add("btn", "control__race");
    this.btnRace.textContent = "RACE";

    this.btnReset.classList.add("btn", "control__reset");
    this.btnReset.textContent = "RESET";

    this.btnGenerate.classList.add("btn", "btn__car", "contorl__generate");
    this.btnGenerate.textContent = "GENERATE CARS";

    this.createCarNew.append(
      this.inputCreateCar,
      this.inputCreateColor,
      this.btnCreateCar
    );

    this.carUpdate.append(
      this.inputUpdateCar,
      this.inputUpdateColor,
      this.btnUpdateCar
    );

    this.garageControl.append(this.btnRace, this.btnReset, this.btnGenerate);

    this.carControl.append(
      this.createCarNew,
      this.carUpdate,
      this.garageControl
    );
  }

  private createPaginationGarage(): void {
    this.pagination.classList.add("pagination");

    this.btnPrev.classList.add("btn", "pagination__prev");
    this.btnPrev.innerText = "previous";

    this.btnNext.classList.add("btn", "pagination__next");
    this.btnNext.innerText = "next";

    this.pagination.append(this.btnPrev, this.btnNext);
  }

  public drawNumPage(number: string): void {
    const numPage = document.querySelector(".title__num") as HTMLSpanElement;
    numPage.innerText = number;
  }
}
