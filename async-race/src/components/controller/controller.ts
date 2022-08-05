import { MethodEnum, UrlPage } from "../../types/enum";
import { DataServer } from "../../types/interface";
import { Loader } from "./loader";
import { Car } from "../view/garage/car";
import { CountCars } from "../../types/types";

export class Appcontroller extends Loader {
  private car: Car;
  protected selectCar: string;
  private callbackCountCars: CountCars;

  constructor() {
    super();
    this.car = new Car();
    this.selectCar = "";
    this.callbackCountCars = (header: string, method?: string) =>
      this.car.drawTotalCars(header, method);
  }
  public getGaragePage(callback: (cars: DataServer[]) => void): void {
    super.getResponse<DataServer[]>(
      {
        method: MethodEnum.get,
      },
      UrlPage.garage,
      callback,
      this.callbackCountCars,
      ["_page=3", "_limit=7"]
    );
  }

  protected createNewCar(): void {
    const nameNewCar = document.querySelector(
        ".car__input"
      ) as HTMLInputElement,
      colorNewCar = document.querySelector(".car__color") as HTMLInputElement;

    const newCar: DataServer = {
      name: nameNewCar.value,
      color: colorNewCar.value,
    };

    super.getResponse<DataServer>(
      {
        method: MethodEnum.post,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      },
      UrlPage.garage,
      (data: DataServer) => this.car.drawNewCar(data),
      this.callbackCountCars
    );
  }

  protected removeSelectCar(): void {
    super.getResponse<string>(
      {
        method: MethodEnum.delete,
      },
      UrlPage.garage,
      (id: string) => this.car.removeSelectCar(id),
      this.callbackCountCars,
      [this.selectCar]
    );
  }
}
