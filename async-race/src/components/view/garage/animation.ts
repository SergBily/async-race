import { EngineData } from "../../../types/types";
import { HeadingWinners } from "../../controller/headingWinners";

export class Animation {
  // myReqs: Map<string, number>;
  private headingWinners: HeadingWinners;

  constructor() {
    // this.myReqs = new Map();
    this.headingWinners = new HeadingWinners();
  }

  public animationCar(data: EngineData[], selectCar: string[]): void {
    let carMaxSpeed = 10;
    let numCar = "";

    selectCar.forEach((car, index) => {
      const carContainer = document.getElementById(car) as HTMLDivElement,
        carImg = carContainer.querySelector(".car__img") as SVGSVGElement,
        widthAllPath = carContainer.querySelector(
          ".container__img"
        ) as HTMLDivElement,
        startPosition = 190,
        fullTime: number = data[index].distance / data[index].velocity,
        allPath: number = widthAllPath.offsetWidth - 95,
        carSpeed = +(fullTime / 1000).toFixed(2);
      // console.log(carSpeed);

      if (carMaxSpeed > carSpeed) {
        carMaxSpeed = carSpeed;
        numCar = car;
      }

      const tStart: number = performance.now();

      function animationProcess() {
        const cStart = performance.now();
        const position =
          startPosition +
          ((cStart - tStart) / 1000) *
            ((allPath - startPosition) / (fullTime / 1000));
        carImg.style.marginLeft = position + "px";

        if (position < allPath) window.requestAnimationFrame(animationProcess);
      }
      animationProcess();
    });
    if (selectCar.length > 1) this.drawWinmessage(numCar, carMaxSpeed);
  }

  public stopAnimationCar(cars: string[]): void {
    cars.forEach((car) => {
      const carContainer = document.getElementById(car) as HTMLDivElement,
        carImg = carContainer.querySelector(".car__img") as SVGSVGElement,
        startPosition = "190px";

      carImg.style.marginLeft = startPosition;
    });
  }

  public engineBreak(selectCar: string): void {
    const carContainer = document.getElementById(selectCar) as HTMLDivElement,
      car = carContainer.querySelector(".car__img") as SVGSVGElement;
    const cur = car.style.marginLeft;
    car.style.marginLeft = cur;
  }

  private drawWinmessage(numCar: string, carMaxSpeed: number): void {
    const carName = document
        .getElementById(numCar)
        ?.querySelector(".auto__name") as HTMLParagraphElement,
      win = document.querySelector(".message-win") as HTMLParagraphElement;

    win.innerText = `${carName.innerText} finished first (${carMaxSpeed}s)`;
    setTimeout(() => win.classList.add("message-win-open"), carMaxSpeed * 1000);
    setTimeout(
      () => win.classList.remove("message-win-open"),
      carMaxSpeed * 1000 + 3000
    );
    this.headingWinners.checkCarToWinners(numCar, carMaxSpeed);
  }
}
