import { EngineData } from "../../../types/types";

export class Animation {
  myReqs: Map<string, number>;

  constructor() {
    this.myReqs = new Map();
  }

  public animationCar(data: EngineData, selectCar: string): void {
    const carContainer = document.getElementById(selectCar) as HTMLDivElement,
      car = carContainer.querySelector(".car__img") as SVGSVGElement,
      widthAllPath = carContainer.querySelector(
        ".container__img"
      ) as HTMLDivElement,
      startPosition = 190,
      fullTime: number = data.distance / data.velocity,
      allPath: number = widthAllPath.offsetWidth - 95,
      tStart: number = performance.now();

    function animationProcess() {
      const cStart = performance.now();

      const position =
        startPosition +
        ((cStart - tStart) / 1000) *
          ((allPath - startPosition) / (fullTime / 1000));
      car.style.marginLeft = position + "px";

      if (position < allPath) {
        window.requestAnimationFrame(animationProcess);
      }
    }
    animationProcess();
  }

  public stopAnimationCar(selectCar: string): void {
    const carContainer = document.getElementById(selectCar) as HTMLDivElement,
      car = carContainer.querySelector(".car__img") as SVGSVGElement,
      startPosition = "190px";

    car.style.marginLeft = startPosition;
  }

  public engineBreak(selectCar: string): void {
    const carContainer = document.getElementById(selectCar) as HTMLDivElement,
      car = carContainer.querySelector(".car__img") as SVGSVGElement;
    const cur = car.style.marginLeft;
    car.style.marginLeft = cur;
  }
}
