import { BtnPaginationEnum, MethodEnum, UrlPage } from "../../types/enum";
import { DataServer } from "../../types/interface";
import { Loader } from "./loader";
import { LocalStorage } from "../localStorage/localStorage";

export class Appcontroller extends Loader {
  public selectCar: string;
  protected localPage: string | null;
  protected locStorage: LocalStorage;
  private currentPage: number;

  constructor() {
    super();

    this.locStorage = new LocalStorage();
    this.selectCar = "";
    this.currentPage = 1;
    this.localPage = this.locStorage.getStorage("page");

    if (this.localPage) this.currentPage = +this.localPage;
  }

  public getGaragePage(): Promise<void | Response> {
    return super.load(
      {
        method: MethodEnum.get,
      },
      UrlPage.garage,
      [`_page=${this.currentPage}`, "_limit=7"]
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
        this.currentPage += 1;
        this.locStorage.setStorage("page", this.currentPage.toString());
        break;

      case BtnPaginationEnum.prev:
        this.currentPage -= 1;
        this.locStorage.setStorage("page", this.currentPage.toString());
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
}
