import { ControlCarEnum } from "../../types/enum";
import { Appcontroller } from "./controller";

export class EventListeners extends Appcontroller {
  public listenCarsControl(parent: HTMLDivElement): void {
    parent.addEventListener("click", (e: Event) => {
      if ((e.target as HTMLButtonElement).innerText === "CREATE") {
        super.createNewCar();
      }
    });
  }

  public listenCar(parent: HTMLDivElement): void {
    const cars = parent.querySelectorAll(".race__container");

    cars.forEach((car) =>
      car.addEventListener("click", (e: Event) => {
        super.selectCar = (e.target as HTMLElement)
          .closest(".race__container")
          ?.getAttribute("id") as string;

        const target = (e.target as HTMLElement).dataset.name;

        switch (target) {
          case ControlCarEnum.remove:
            super.removeSelectCar();
            break;

          case ControlCarEnum.launch:
            break;

          case ControlCarEnum.stop:
            break;
        }
      })
    );
  }
}
