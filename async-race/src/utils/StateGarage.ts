export class AddCar {
  public count(allCar: number): number {
    return allCar + 1;
  }
}

export class RemoveCar {
  public count(allCar: number): number {
    return allCar - 1;
  }
}

export class RandomCar {
  public count(allCar: number): number {
    return allCar + 100;
  }
}
