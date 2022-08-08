import { EngineData } from "../../../types/types";

export class Animation {
  myReqs: Map<string, number>;

  constructor() {
    this.myReqs = new Map();
  }

  public animationCar(data: EngineData[], selectCar: string[]): void {
    selectCar.forEach((car, index) => {
      const carContainer = document.getElementById(car) as HTMLDivElement,
        carName = carContainer.querySelector(
          ".auto__name"
        ) as HTMLParagraphElement,
        carImg = carContainer.querySelector(".car__img") as SVGSVGElement,
        widthAllPath = carContainer.querySelector(
          ".container__img"
        ) as HTMLDivElement,
        win = document.querySelector(".message-win") as HTMLParagraphElement,
        startPosition = 190,
        fullTime: number = data[index].distance / data[index].velocity,
        allPath: number = widthAllPath.offsetWidth - 95,
        tStart: number = performance.now();

      function animationProcess() {
        const cStart = performance.now();
        const position =
          startPosition +
          ((cStart - tStart) / 1000) *
            ((allPath - startPosition) / (fullTime / 1000));
        carImg.style.marginLeft = position + "px";

        if (position < allPath) {
          window.requestAnimationFrame(animationProcess);
        } else {
          if (!win.classList.contains("message-win-open")) {
            const timeWin: string = (fullTime / 1000).toFixed(2);
            win.innerText = `${carName.innerText} finished first (${timeWin}s)`;
            win.classList.add("message-win-open");
          }
        }
      }
      animationProcess();
    });
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
}
