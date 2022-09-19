import {
  BtnControlGarageEnum,
  ControlCarEnum,
  StatusCarEnum,
  UrlPage,
} from "../../../types/enum";
import { DataServer } from "../../../types/interface";
import {
  CarOrCars,
  DataServerT,
  EngineData,
  ResponseT,
  StateGarage,
} from "../../../types/types";
import { Appcontroller } from "../../controller/controller";
import { Animation } from "./animation";
import { GeneratePromise } from "../../controller/generatePromise";
import { GenerateCars } from "../../controller/generateCars";
import { Winners } from "../winners/winners";
import { Pagination } from "../pagination";
import { LocalStorage } from "../../localStorage/localStorage";
import { AddCar, RandomCar, RemoveCar } from "../../../utils/StateGarage";
import {
  customCreateNewElement,
  customInsertChilds,
} from "../../../utils/newElement";

export class Garage {
  public controller: Appcontroller;
  private animationCars: Animation;
  private request: GeneratePromise;
  private generateCars: GenerateCars;
  private paginationBtns: Pagination;
  private winners: Winners;
  private cuctomStorage: LocalStorage;
  private readonly body;
  private readonly wrapper: HTMLDivElement;
  private pagination: HTMLDivElement;
  private members: HTMLDivElement;
  private newCar: HTMLDivElement;
  public curPage: number;
  public allCarToGarage: number;

  constructor() {
    this.controller = new Appcontroller();
    this.animationCars = new Animation();
    this.request = new GeneratePromise();
    this.generateCars = new GenerateCars();
    this.winners = new Winners();
    this.paginationBtns = new Pagination();
    this.cuctomStorage = new LocalStorage();
    this.body = document.querySelector(".body") as HTMLBodyElement;
    this.wrapper = document.createElement("div");
    this.pagination = document.createElement("div");
    this.members = document.createElement("div");
    this.newCar = document.createElement("div");
    this.curPage = 1;
    this.allCarToGarage = 0;
  }

  public createPageGarage(): void {
    if (this.body.firstElementChild) {
      this.body.firstElementChild.remove();
    }
    this.cuctomStorage.setStorage("pWinners", "close");

    this.wrapper.classList.add("wrapper");
    const titlePage = customCreateNewElement<HTMLHeadElement>(
      "h1",
      ["title__page"],
      "Garage("
    );
    const totalCars = customCreateNewElement<HTMLSpanElement>("span", [
      "total__cars",
    ]);
    const btnPages = customCreateNewElement<HTMLDivElement>("div", [
      "btn__pages",
    ]);
    const btnGarage = customCreateNewElement<HTMLButtonElement>(
      "button",
      ["btn", "btn__garage"],
      "TO GARAGE",
      { "data-name": "garage" }
    );
    const btnWinners = customCreateNewElement<HTMLButtonElement>(
      "button",
      ["btn", "btn__winners"],
      "TO WINNERS",
      { "data-name": "winners" }
    );
    const titleRace = customCreateNewElement<HTMLHeadElement>(
      "h2",
      ["title__race"],
      "Page #"
    );
    const titleNum = customCreateNewElement<HTMLSpanElement>(
      "span",
      ["title__num"],
      "1"
    );

    this.pagination = this.paginationBtns.createPaginationPage();
    console.log(this.pagination);

    customInsertChilds(this.body, [this.wrapper]);
    customInsertChilds(titlePage, [totalCars]);
    customInsertChilds(btnPages, [btnGarage, btnWinners]);
    customInsertChilds(titleRace, [titleNum]);
    customInsertChilds(this.wrapper, [
      titlePage,
      btnPages,
      this.createControlCars(),
      titleRace,
      this.members,
      this.pagination,
    ]);

    this.paginationBtns.addListeners(this);
    btnPages.addEventListener("click", this.addListeners.bind(this));
  }

  private createControlCars(): HTMLDivElement {
    const carControl = customCreateNewElement<HTMLDivElement>("div", [
      "car__control",
    ]);

    customInsertChilds(carControl, [
      this.createControlsNewCar(),
      this.createControlsUpdateCar(),
      this.createControlsAllCar(),
      this.winCar(),
    ]);

    carControl.addEventListener("click", this.addListeners.bind(this));
    return carControl;
  }

  private createControlsNewCar(): HTMLDivElement {
    const containerCreateCar = customCreateNewElement<HTMLDivElement>("div", [
      "car__new",
    ]);

    const inputCreateCar = customCreateNewElement<HTMLInputElement>(
      "input",
      ["car__input"],
      undefined,
      {
        type: "test",
        autofocus: "true",
        autocomplete: "on",
        placeholder: "create auto",
      }
    );
    const inputCreateColor = customCreateNewElement<HTMLInputElement>(
      "input",
      ["car__color"],
      undefined,
      { type: "color", value: "#f41049" }
    );
    const btnCreateCar = customCreateNewElement<HTMLButtonElement>(
      "button",
      ["btn", "btn__car", "car__create"],
      "CREATE",
      { "data-name": "create" }
    );

    customInsertChilds(containerCreateCar, [
      inputCreateCar,
      inputCreateColor,
      btnCreateCar,
    ]);
    return containerCreateCar;
  }

  private createControlsUpdateCar(): HTMLDivElement {
    const containerUpdateCar = customCreateNewElement<HTMLDivElement>("div", [
      "car__update",
    ]);
    const inputUpdateCar = customCreateNewElement<HTMLInputElement>(
      "input",
      ["car__input", "input__update", "disable"],
      undefined,
      {
        type: "test",
        autofocus: "true",
        autocomplete: "on",
        placeholder: "update auto",
        disabled: "true",
      }
    );
    const inputUpdateColor = customCreateNewElement<HTMLInputElement>(
      "input",
      ["car__color", "input__color-update", "disable"],
      undefined,
      {
        type: "color",
        value: "#2819f5",
        disabled: "true",
      }
    );
    const btnUpdateCar = customCreateNewElement<HTMLButtonElement>(
      "button",
      ["btn", "btn__car", "car__updates"],
      "UPDATE",
      { "data-name": "update" }
    );

    customInsertChilds(containerUpdateCar, [
      inputUpdateCar,
      inputUpdateColor,
      btnUpdateCar,
    ]);
    return containerUpdateCar;
  }

  private createControlsAllCar(): HTMLDivElement {
    const garageControl = customCreateNewElement<HTMLDivElement>("div", [
      "garage__control",
    ]);

    const btnRace = customCreateNewElement<HTMLButtonElement>(
      "button",
      ["btn", "control__race"],
      "RACE",
      { "data-name": "race" }
    );
    const btnReset = customCreateNewElement<HTMLButtonElement>(
      "button",
      ["btn", "control__reset"],
      "RESET",
      { "data-name": "reset" }
    );
    const btnGenerate = customCreateNewElement<HTMLButtonElement>(
      "button",
      ["btn", "btn__car", "contorl__generate"],
      "GENERATE CARS",
      { "data-name": "generate" }
    );

    customInsertChilds(garageControl, [btnRace, btnReset, btnGenerate]);
    return garageControl;
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

  private winCar(): HTMLDivElement {
    const winTable: HTMLDivElement = document.createElement("p");
    winTable.classList.add("message-win");
    return winTable;
  }

  private addListenerCars(oneCar?: boolean): void {
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

  public drawNewCar(car: DataServer): void {
    const members = document.querySelector(".members") as HTMLDivElement;
    const maxCarsOnPage = 7;
    if (members.children.length === maxCarsOnPage) return;

    this.drawCars([car], true);
    members.appendChild(this.newCar);
    this.addListenerCars(true);
  }

  public drawTotalCars(actionToGarage: StateGarage): void {
    const totalCars = document.querySelector(".total__cars") as HTMLSpanElement;
    this.allCarToGarage = actionToGarage.count(this.allCarToGarage);
    totalCars.innerText = `${this.allCarToGarage})`;
    this.paginationBtns.controlPaginationBtn(this.allCarToGarage, this.curPage);
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

  private addListeners(e: Event): void {
    const btn = (e.target as HTMLButtonElement).dataset.name as string;
    if (btn === UrlPage.winners) this.winners.createPageWinners();
    this.controlGarage(btn);
  }

  private enableUpdate(): void {
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

  private disableBtn(btn: string, cars?: string[]): void {
    if (cars) {
      cars.forEach((car) => toggle(car, btn));
    } else {
      toggle(this.controller.selectCar, btn);
    }

    function toggle(car: string, btnName: string) {
      const selectCar = document.getElementById(car) as HTMLDivElement,
        btn = selectCar.querySelector(`.${btnName}`) as HTMLButtonElement;

      btn.disabled ? (btn.disabled = false) : (btn.disabled = true);
      btn.classList.add("disable-start-stop");
    }
  }

  private enableBtn(btn: string, cars?: string[]): void {
    cars
      ? cars.forEach((car) => toggle(car, btn))
      : toggle(this.controller.selectCar, btn);

    function toggle(car: string, btnName: string) {
      const selectCar = document.getElementById(car) as HTMLDivElement,
        btn = selectCar.querySelector(`.${btnName}`) as HTMLButtonElement;

      btn.disabled ? (btn.disabled = false) : (btn.disabled = true);
      btn.classList.remove("disable-start-stop");
    }
  }

  public async controlGarage(btn: string): Promise<void> {
    let response: ResponseT;
    let data: DataServerT;
    let cars: string[];
    switch (btn) {
      case BtnControlGarageEnum.create:
        response = (await this.controller.createNewCar()) as Response;
        data = (await response.json()) as DataServer;
        this.drawNewCar(data);
        this.drawTotalCars(new AddCar());
        this.cleanInputField(btn);
        break;

      case BtnControlGarageEnum.update:
        response = (await this.controller.updateSelectCar()) as Response;
        data = (await response.json()) as DataServer;
        this.drawUpdateCar(data, this.controller.selectCar);
        this.cleanInputField(btn);
        this.enableUpdate();
        break;

      case BtnControlGarageEnum.racce:
        response = (await Promise.all(
          this.request.generatePromiseRace(this.controller, StatusCarEnum.start)
        )) as Response[];
        data = await Promise.all(response.map((req) => req.json()));
        cars = this.request.getmembersOfPage();
        this.animationCars.animationCar(data, cars);
        this.disableBtn("btn__launch", cars);
        this.enableBtn("btn__stop", cars);
        break;

      case BtnControlGarageEnum.reset:
        response = (await Promise.all(
          this.request.generatePromiseRace(this.controller, StatusCarEnum.stop)
        )) as Response[];
        cars = this.request.getmembersOfPage();
        this.animationCars.stopAnimationCar(cars);
        this.disableBtn("btn__stop", cars);
        this.enableBtn("btn__launch", cars);
        break;

      case BtnControlGarageEnum.generate:
        response = (await Promise.all(
          this.request.generatePromiseCars(
            this.controller,
            this.generateCars.generate()
          )
        )) as Response[];
        this.drawTotalCars(new RandomCar());

        break;
    }
  }

  public async controlMember(btn: string): Promise<void> {
    let response: Response;
    let data: EngineData;

    switch (btn) {
      case ControlCarEnum.remove:
        await this.controller.removeSelectCar(UrlPage.garage);
        await this.controller.removeSelectCar(UrlPage.winners);
        this.removeSelectCar(this.controller.selectCar);
        this.drawTotalCars(new RemoveCar());
        break;

      case ControlCarEnum.launch:
        this.disableBtn("btn__launch");
        this.enableBtn("btn__stop");
        response = (await this.controller.controlEngineCar(
          StatusCarEnum.start
        )) as Response;

        while (response.status === 429) {
          response = (await this.controller.controlEngineCar(
            StatusCarEnum.start
          )) as Response;
        }
        data = await response.json();
        this.animationCars.animationCar([data], [this.controller.selectCar]);

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
        this.disableBtn("btn__stop");
        this.enableBtn("btn__launch");
        response = (await this.controller.controlEngineCar(
          StatusCarEnum.stop
        )) as Response;
        this.animationCars.stopAnimationCar([this.controller.selectCar]);
        break;

      case ControlCarEnum.select:
        this.enableUpdate();
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
