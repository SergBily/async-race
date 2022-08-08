import {
  BtnControlGarageEnum,
  ControlCarEnum,
  MethodEnum,
  StatusCarEnum,
} from "../../../types/enum";
import { DataServer } from "../../../types/interface";
import { CarOrCars, EngineData } from "../../../types/types";
import { Appcontroller } from "../../controller/controller";
import { Animation } from "./animation";

export class Garage {
  private controller: Appcontroller;
  private animationCars: Animation;
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
  protected readonly pagination: HTMLDivElement;
  private readonly btnPrev: HTMLButtonElement;
  private readonly btnNext: HTMLButtonElement;
  private members: HTMLDivElement;
  private newCar: HTMLDivElement;

  constructor() {
    this.controller = new Appcontroller();
    this.animationCars = new Animation();
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
    this.members = document.createElement("div");
    this.newCar = document.createElement("div");
  }

  public createPageGarage(): void {
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
      this.members,
      this.pagination
    );
    this.body.appendChild(this.wrapper);

    this.addListeners();
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
    this.btnCreateCar.setAttribute("data-name", "create");
    this.btnCreateCar.innerText = "CREATE";

    this.carUpdate.classList.add("car__update");

    this.inputUpdateCar.classList.add("car__input", "input__update", "disable");
    this.inputUpdateCar.type = "text";
    this.inputUpdateCar.autocomplete = "on";
    this.inputUpdateCar.placeholder = "update auto";
    this.inputUpdateCar.disabled = true;

    this.inputUpdateColor.classList.add(
      "car__color",
      "input__color-update",
      "disable"
    );
    this.inputUpdateColor.type = "color";
    this.inputUpdateColor.value = "#2819f5";
    this.inputUpdateColor.disabled = true;

    this.btnUpdateCar.classList.add("btn", "btn__car", "car__updates");
    this.btnUpdateCar.setAttribute("data-name", "update");
    this.btnUpdateCar.innerText = "UPDATE";

    this.garageControl.classList.add("garage__control");

    this.btnRace.classList.add("btn", "control__race");
    this.btnRace.setAttribute("data-name", "race");
    this.btnRace.textContent = "RACE";

    this.btnReset.classList.add("btn", "control__reset");
    this.btnReset.setAttribute("data-name", "reset");
    this.btnReset.textContent = "RESET";

    this.btnGenerate.classList.add("btn", "btn__car", "contorl__generate");
    this.btnGenerate.setAttribute("data-name", "generate");
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

  public drawCars(cars: DataServer[], newCar?: boolean): void {
    if (!newCar) this.removeMembers();
    this.members.classList.add("members");

    cars.forEach((car) => {
      const raceContainer: HTMLDivElement = document.createElement("div"),
        autoControl: HTMLDivElement = document.createElement("div"),
        raceControl: HTMLDivElement = document.createElement("div"),
        btnSelect: HTMLButtonElement = document.createElement("button"),
        btnRemove: HTMLButtonElement = document.createElement("button"),
        autoName: HTMLParagraphElement = document.createElement("p"),
        btnLaunch: HTMLButtonElement = document.createElement("button"),
        btnStop: HTMLButtonElement = document.createElement("button"),
        containerImg: HTMLDivElement = document.createElement("div"),
        carImg: SVGSVGElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        ),
        carFlag: HTMLImageElement = document.createElement("img");

      raceContainer.classList.add("race__container");
      raceContainer.setAttribute("id", `${car.id}`);

      autoControl.classList.add("auto__control");

      btnSelect.classList.add("btn", "btn__car", "btn__select");
      btnSelect.setAttribute("data-name", "select");
      btnSelect.textContent = "SELECT";

      btnRemove.classList.add("btn", "btn__car", "btn__remove");
      btnRemove.setAttribute("data-name", "remove");
      btnRemove.textContent = "REMOVE";

      autoName.classList.add("auto__name");
      autoName.textContent = car.name;

      raceControl.classList.add("race__control");

      btnLaunch.classList.add("btn", "btn__launch");
      btnLaunch.setAttribute("data-name", "launch");
      btnLaunch.textContent = "Launch";

      btnStop.classList.add("btn", "btn__stop", "disable-start-stop");
      btnStop.setAttribute("data-name", "stop");
      btnStop.textContent = "Stop";
      btnStop.disabled = true;

      containerImg.classList.add("container__img");
      carImg.classList.add("car__img");
      carImg.style.fill = car.color;
      carImg.setAttribute("width", "80");
      carImg.setAttribute("height", "32");
      carImg.insertAdjacentHTML(
        "beforeend",
        "<use xlink:href='./assets/img/sprite.svg#car'></use>"
      );

      carFlag.classList.add("car__flag");
      carFlag.setAttribute("width", "50");
      carFlag.setAttribute("height", "50");
      carFlag.src = "./assets/img/flag.png";
      carFlag.alt = "flag";

      autoControl.append(btnSelect, btnRemove, autoName);
      raceControl.append(btnLaunch, btnStop, carFlag);
      containerImg.appendChild(carImg);
      raceContainer.append(autoControl, raceControl, containerImg);
      this.newCar = raceContainer;
      this.members.append(raceContainer);
    });
    if (!newCar) this.addListenerCars();
  }

  private addListenerCars(oneCar?: boolean) {
    let cars: CarOrCars;

    oneCar
      ? (cars = [this.newCar])
      : (cars = this.members.querySelectorAll(".race__container"));

    cars.forEach((car) =>
      car.addEventListener("click", (e: Event) => {
        this.controller.selectCar = (e.target as HTMLElement)
          .closest(".race__container")
          ?.getAttribute("id") as string;

        const btn = (e.target as HTMLElement).dataset.name as string;
        this.controlMember(btn);
      })
    );
  }

  public drawNewCar(car: DataServer) {
    const members = document.querySelector(".members") as HTMLDivElement;
    const maxCarsOnPage = 7;
    if (members.children.length === maxCarsOnPage) return;

    this.drawCars([car], true);
    members.appendChild(this.newCar);
    this.addListenerCars(true);
  }

  public drawTotalCars(method: string, numCars?: string): void {
    const totalCars = document.querySelector(".total__cars") as HTMLSpanElement;

    switch (method) {
      case MethodEnum.get:
        totalCars.innerText = `${numCars})`;
        break;

      case MethodEnum.post:
        totalCars.innerText = `${(
          parseInt(totalCars.innerText) + 1
        ).toString()})`;
        break;

      case MethodEnum.delete:
        totalCars.innerText = `${(
          parseInt(totalCars.innerText) - 1
        ).toString()})`;
        break;
    }
  }

  public removeSelectCar(id: string): void {
    const target = document.getElementById(id) as HTMLDivElement;
    const inputNewCar = document.querySelector(
      ".car__input"
    ) as HTMLInputElement;
    inputNewCar.value = "";
    target.remove();
  }

  private drawUpdateCar(car: DataServer, id: string): void {
    const target = document.getElementById(id) as HTMLDivElement;

    this.drawCars([car], true);
    target.replaceWith(this.newCar);
    this.addListenerCars(true);
  }

  private removeMembers(): void {
    const members = document.querySelector(".members") as HTMLDivElement;
    if (!members) return;

    while (members.firstElementChild) {
      members.firstElementChild.remove();
    }
  }

  private createPaginationGarage(): void {
    this.pagination.classList.add("pagination");

    this.btnPrev.classList.add("btn", "pagination__prev");
    this.btnPrev.setAttribute("data-name", "prev");
    this.btnPrev.innerText = "previous";

    this.btnNext.classList.add("btn", "pagination__next");
    this.btnNext.setAttribute("data-name", "next");
    this.btnNext.innerText = "next";

    this.pagination.append(this.btnPrev, this.btnNext);
  }

  public drawNumPage(number: string): void {
    const numPage = document.querySelector(".title__num") as HTMLSpanElement;
    numPage.innerText = number;
  }

  private addListeners(): void {
    this.pagination.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).dataset.name as string;
      this.switchOtherPage(btn);
    });

    this.carControl.addEventListener("click", (e: Event) => {
      const btn = (e.target as HTMLButtonElement).dataset.name as string;
      this.controlGarage(btn);
    });
  }

  private updateEnable(): void {
    const input = document.querySelector(".input__update") as HTMLInputElement,
      color = document.querySelector(
        ".input__color-update"
      ) as HTMLInputElement;

    input.classList.toggle("disable");
    color.classList.toggle("disable");

    if (input.disabled) {
      input.disabled = false;
      color.disabled = false;
    } else {
      input.disabled = true;
      color.disabled = true;
    }
  }

  public async switchOtherPage(btn: string): Promise<void> {
    const response = (await this.controller.paginationPage(btn)) as Response;
    const data: DataServer[] = await response.json();
    const numPage: string = response.url.split("=")[1][0];

    this.drawCars(data);
    this.drawNumPage(numPage);
  }

  private toggleStopBtn(): void {
    const selectCar = document.getElementById(
        this.controller.selectCar
      ) as HTMLDivElement,
      btn = selectCar.querySelector(".btn__stop") as HTMLButtonElement;

    btn.disabled ? (btn.disabled = false) : (btn.disabled = true);
    btn.classList.toggle("disable-start-stop");
  }

  private toggleLaunchBtn(): void {
    const selectCar = document.getElementById(
        this.controller.selectCar
      ) as HTMLDivElement,
      btn = selectCar.querySelector(".btn__launch") as HTMLButtonElement;

    btn.disabled ? (btn.disabled = false) : (btn.disabled = true);
    btn.classList.toggle("disable-start-stop");
  }

  public async controlGarage(btn: string): Promise<void> {
    let response: Response;
    let data: DataServer;
    switch (btn) {
      case BtnControlGarageEnum.create:
        response = (await this.controller.createNewCar()) as Response;
        data = await response.json();
        this.drawNewCar(data);
        this.drawTotalCars("POST");
        this.cleanInputField(btn);
        break;

      case BtnControlGarageEnum.update:
        response = (await this.controller.updateSelectCar()) as Response;
        data = await response.json();
        this.drawUpdateCar(data, this.controller.selectCar);
        this.cleanInputField(btn);
        this.updateEnable();
        break;

      case BtnControlGarageEnum.racce:
        break;

      case BtnControlGarageEnum.reset:
        break;

      case BtnControlGarageEnum.generate:
        break;
    }
  }

  public async controlMember(btn: string): Promise<void> {
    let response: Response;
    let data: EngineData;

    switch (btn) {
      case ControlCarEnum.remove:
        await this.controller.removeSelectCar();
        this.removeSelectCar(this.controller.selectCar);
        this.drawTotalCars("DELETE");
        break;

      case ControlCarEnum.launch:
        this.toggleStopBtn();
        this.toggleLaunchBtn();
        response = (await this.controller.controlEngineCar(
          StatusCarEnum.start
        )) as Response;
        console.log(response.status);

        while (response.status === 429) {
          response = (await this.controller.controlEngineCar(
            StatusCarEnum.start
          )) as Response;
        }
        data = await response.json();
        this.animationCars.animationCar(data, this.controller.selectCar);

        response = (await this.controller.controlEngineCar(
          StatusCarEnum.drive
        )) as Response;
        if (response.status === 500) {
          const carBreak = (response.url.match(
            /id=\d*/
          ) as RegExpMatchArray)[0].split("=")[1];
          this.animationCars.engineBreak(carBreak);
        }

        break;

      case ControlCarEnum.stop:
        this.toggleLaunchBtn();
        this.toggleStopBtn();
        response = (await this.controller.controlEngineCar(
          StatusCarEnum.stop
        )) as Response;
        data = await response.json();
        this.animationCars.stopAnimationCar(this.controller.selectCar);
        break;

      case ControlCarEnum.select:
        this.updateEnable();
        break;
    }
  }

  private cleanInputField(btn: string): void {
    let input: HTMLInputElement;
    let color: HTMLInputElement;

    switch (btn) {
      case BtnControlGarageEnum.create:
        input = document.querySelector(".car__input") as HTMLInputElement;
        color = document.querySelector(".car__color") as HTMLInputElement;
        input.value = "";
        color.value = "#f41049";

        break;

      case BtnControlGarageEnum.update:
        input = document.querySelector(".input__update") as HTMLInputElement;
        color = document.querySelector(
          ".input__color-update"
        ) as HTMLInputElement;
        input.value = "";
        color.value = "#2819f5";
        break;
    }
  }
}
