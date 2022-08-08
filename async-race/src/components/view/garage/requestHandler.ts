import { Appcontroller } from "../../controller/controller";

export class CreateRequest {
  public createRequstRace(
    controller: Appcontroller
  ): Promise<void | Response>[] {
    const carsOnPage = this.getmembersOfPage();
    const promiseCars = carsOnPage.map((idCar) =>
      controller.controlEngineAllCar(idCar)
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
}
