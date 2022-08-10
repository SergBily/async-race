import {
  BtnControlGarageEnum,
  ControlCarEnum,
  MethodEnum,
  StatusCarEnum,
  UrlPage,
} from "../../../types/enum";
import { DataServer } from "../../../types/interface";
import {
  CarOrCars,
  DataServerT,
  EngineData,
  ResponseT,
} from "../../../types/types";
import { Appcontroller } from "../../controller/controller";
import { Animation } from "./animation";
import { GeneratePromise } from "../../controller/generatePromise";
import { GenerateCars } from "../../controller/generateCars";
import { Winners } from "../winners/winners";
import { Pagination } from "../pagination";

export class Garage {
  private controller: Appcontroller;
  private animationCars: Animation;
  private request: GeneratePromise;
  private generateCars: GenerateCars;
  private paginationPage: Pagination;
  private winners: Winners;
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
  private pagination: HTMLDivElement;
  private members: HTMLDivElement;
  private newCar: HTMLDivElement;
  private curPage: number;

  constructor() {
    this.controller = new Appcontroller();
    this.animationCars = new Animation();
    this.request = new GeneratePromise();
    this.generateCars = new GenerateCars();
    this.winners = new Winners();
    this.paginationPage = new Pagination();
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
    this.members = document.createElement("div");
    this.newCar = document.createElement("div");
    this.curPage = 1;
  }

  public createPageGarage(): void {
    this.wrapper.classList.add("wrapper");
    this.titlePage.classList.add("title__page");
    this.titlePage.innerText = "Garage(";
    this.totalCars.classList.add("total__cars");

    this.btnPages.classList.add("btn__pages");

    this.btnGarage.classList.add("btn", "btn__garage");
    this.btnGarage.textContent = "TO GARAGE";
    this.btnGarage.setAttribute("data-name", "garage");

    this.btnWinners.classList.add("btn", "btn__winners");
    this.btnWinners.textContent = "TO WINNERS";
    this.btnWinners.setAttribute("data-name", "winners");

    this.createCarControl();

    this.titleRace.classList.add("title__race");
    this.titleRace.innerText = "Page #";

    this.titleNum.classList.add("title__num");
    this.titleNum.innerText = "1";
    this.pagination = this.paginationPage.createPaginationPage();
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
      this.garageControl,
      this.winCar()
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

  public drawTotalCars(
    method: string,
    numCars?: string,
    random?: boolean
  ): void {
    const totalCars = document.querySelector(".total__cars") as HTMLSpanElement;
    let chooseNum: number;

    switch (method) {
      case MethodEnum.get:
        totalCars.innerText = `${numCars})`;
        break;

      case MethodEnum.post:
        random ? (chooseNum = 100) : (chooseNum = 1);
        totalCars.innerText = `${(
          parseInt(totalCars.innerText) + chooseNum
        ).toString()})`;
        break;

      case MethodEnum.delete:
        totalCars.innerText = `${(
          parseInt(totalCars.innerText) - 1
        ).toString()})`;
        break;
    }
    const allCar = parseInt(totalCars.innerText);

    this.controlPaginationBtn(allCar);
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

  public drawNumPage(number: string): void {
    const numPage = document.querySelector(".title__num") as HTMLSpanElement,
      totalCars = document.querySelector(".total__cars") as HTMLSpanElement;
    numPage.innerText = number;
    this.curPage = +number;
    const allCar = parseInt(totalCars.innerText);
    this.controlPaginationBtn(allCar);
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

    this.btnPages.addEventListener("click", (e) => {
      const btn = (e.target as HTMLButtonElement).dataset.name as string;
      if (btn === UrlPage.winners) this.winners.createPageWinners();
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
    const numPage = (response.url.match(
      /page=\d*/
    ) as RegExpMatchArray)[0].split("=")[1];

    this.drawCars(data);
    this.drawNumPage(numPage);
  }

  private controlPaginationBtn(allCar: number): void {
    const prev = document.querySelector(
        ".pagination__prev"
      ) as HTMLButtonElement,
      next = document.querySelector(".pagination__next") as HTMLButtonElement,
      limitCar = 7,
      allPage = Math.ceil(allCar / limitCar);

    if (this.curPage === allPage) {
      next.disabled = true;
      next.classList.remove("pagination__activ");
    } else if (this.curPage < allPage) {
      next.disabled = false;
      next.classList.add("pagination__activ");
    }

    if (this.curPage === 1) {
      prev.disabled = true;
      prev.classList.remove("pagination__activ");
    } else {
      prev.disabled = false;
      prev.classList.add("pagination__activ");
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
        this.drawTotalCars("POST");
        this.cleanInputField(btn);
        break;

      case BtnControlGarageEnum.update:
        response = (await this.controller.updateSelectCar()) as Response;
        data = (await response.json()) as DataServer;
        this.drawUpdateCar(data, this.controller.selectCar);
        this.cleanInputField(btn);
        this.updateEnable();
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
        this.drawTotalCars("POST", "", true);

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
        this.drawTotalCars("DELETE");
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
