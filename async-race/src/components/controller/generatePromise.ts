import { DataServer } from "../../types/interface";
import { Appcontroller } from "./controller";

export class GeneratePromise {
  public generatePromiseRace(
    controller: Appcontroller,
    status: string
  ): Promise<void | Response>[] {
    const carsOnPage = this.getmembersOfPage();
    const promiseCars = carsOnPage.map((idCar) =>
      controller.controlEngineCar(status, idCar)
    ) as Promise<Response>[];

    return promiseCars;
  }

  public getmembersOfPage(): string[] {
    const members = document.querySelector(".members") as HTMLDivElement,
      cars = members.querySelectorAll(
        ".race__container"
      ) as NodeListOf<HTMLDivElement>,
      carsOnPage: string[] = Array.from(cars).map((car) => car.id);

    return carsOnPage;
  }

  public generatePromiseCars(
    controller: Appcontroller,
    cars: DataServer[]
  ): Promise<void | Response>[] {
    return cars.map((car) => controller.createNewCar(car));
  }
}
