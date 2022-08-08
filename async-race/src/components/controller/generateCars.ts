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
}
