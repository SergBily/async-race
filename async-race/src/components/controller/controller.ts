import { BtnPaginationEnum, MethodEnum, UrlPage } from "../../types/enum";
import { DataServer } from "../../types/interface";
import { Loader } from "./loader";
import { LocalStorage } from "../localStorage/localStorage";

export class Appcontroller extends Loader {
  public selectCar: string;
  protected localPageGarage: string | null;
  protected locStorage: LocalStorage;
  private currentPageGarage: number;
  private currentPageWinners: number;

  constructor() {
    super();

    this.locStorage = new LocalStorage();
    this.selectCar = "";
    this.currentPageGarage = 1;
    this.currentPageWinners = 1;
    this.localPageGarage = this.locStorage.getStorage("pageGarage");
    if (this.localPageGarage) this.currentPageGarage = +this.localPageGarage;
  }

  public getGaragePage(): Promise<void | Response> {
    return super.load(
      {
        method: MethodEnum.get,
      },
      UrlPage.garage,
      [`_page=${this.currentPageGarage}`, "_limit=7"]
    );
  }

  public async getCar(id: string): Promise<void | Response> {
    return super.load(
      {
        method: MethodEnum.get,
      },
      UrlPage.garage,
      [id]
    );
  }

  public createNewCar(car?: DataServer): Promise<void | Response> {
    let newCar: DataServer;
    if (car) {
      newCar = car;
    } else {
      const nameNewCar = document.querySelector(
          ".car__input"
        ) as HTMLInputElement,
        colorNewCar = document.querySelector(".car__color") as HTMLInputElement;

      newCar = {
        name: nameNewCar.value,
        color: colorNewCar.value,
      };
    }

    return super.load(
      {
        method: MethodEnum.post,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      },
      UrlPage.garage
    );
  }

  public removeSelectCar(): Promise<void | Response> {
    return super.load(
      {
        method: MethodEnum.delete,
      },
      UrlPage.garage,
      [this.selectCar]
    );
  }

  public updateSelectCar(): Promise<void | Response> {
    const nameSelectCar = document.querySelector(
        ".input__update"
      ) as HTMLInputElement,
      colorSelectCar = document.querySelector(
        ".input__color-update"
      ) as HTMLInputElement;

    const updateCar: DataServer = {
      name: nameSelectCar.value,
      color: colorSelectCar.value,
    };

    return super.load(
      {
        method: MethodEnum.put,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCar),
      },
      UrlPage.garage,
      [this.selectCar]
    );
  }

  public paginationPage(btn: string): Promise<void | Response> {
    switch (btn) {
      case BtnPaginationEnum.next:
        this.currentPageGarage += 1;
        this.locStorage.setStorage(
          "pageGarage",
          this.currentPageGarage.toString()
        );
        break;

      case BtnPaginationEnum.prev:
        this.currentPageGarage -= 1;
        this.locStorage.setStorage(
          "pageGarage",
          this.currentPageGarage.toString()
        );
        break;
    }
    return this.getGaragePage();
  }

  public controlEngineCar(
    status: string,
    id?: string
  ): Promise<void | Response> {
    let car: string;

    id ? (car = id) : (car = this.selectCar);

    return super.load(
      {
        method: MethodEnum.patch,
      },
      UrlPage.engine,
      [`id=${car}`, `status=${status}`]
    );
  }

  public getWiners(): Promise<void | Response> {
    return super.load(
      {
        method: MethodEnum.get,
      },
      UrlPage.winners,
      [`_page=${this.currentPageWinners}`, "_limit=10"]
    );
  }
}
