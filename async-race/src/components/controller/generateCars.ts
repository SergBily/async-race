import { DataServer } from "../../types/interface";

export class GenerateCars {
  private brand: string[];
  private model: string[];
  private color: string[];

  constructor() {
    this.brand = [
      "Audi",
      "Bentley",
      "BMW",
      "Bugatti",
      "Chevrolet",
      "Chrysler",
      "Ford",
      "Ferrari",
      "Dodge",
      "Honda",
    ];
    this.model = [
      "passat",
      "polo",
      "superb",
      "touareg",
      "cayenne",
      "forester",
      "panamera",
      "gts",
      "mustang",
      "macan",
    ];
    this.color = [
      "#FF0000",
      "#FF1493",
      "#00FF00",
      "#006400",
      "#00FFFF",
      "#FF00FF",
      "#0000FF",
      "#7FFFD4",
      "#FFFF00",
      "#2F4F4F",
    ];
  }

  public generate(): DataServer[] {
    const newRandomCars: DataServer[] = [],
      limitCars = 100;

    while (newRandomCars.length < limitCars) {
      const brand = this.brand[this.randomNum()],
        model = this.model[this.randomNum()],
        color = this.color[this.randomNum()],
        car = {
          name: `${brand} ${model}`,
          color,
        };
      newRandomCars.push(car);
    }
    return newRandomCars;
  }

  private randomNum(): number {
    return Math.trunc(Math.random() * 10);
  }
}
