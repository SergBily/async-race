import { MethodEnum } from "../../../types/enum";
import { DataServer } from "../../../types/interface";

export class Car {
  public members: HTMLDivElement;
  private newCar: HTMLDivElement;

  constructor() {
    this.members = document.createElement("div");
    this.newCar = document.createElement("div");
  }
  public drawCars(cars: DataServer[]): void {
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

      btnStop.classList.add("btn", "btn__stop");
      btnStop.setAttribute("data-name", "stop");
      btnStop.textContent = "Stop";

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
      raceControl.append(btnLaunch, btnStop, carImg, carFlag);

      raceContainer.append(autoControl, raceControl);
      this.newCar = raceContainer;
      this.members.append(raceContainer);
    });
  }

  public drawNewCar(car: DataServer) {
    const members = document.querySelector(".members") as HTMLDivElement;
    this.drawCars([car]);
    members.appendChild(this.newCar);
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
}
