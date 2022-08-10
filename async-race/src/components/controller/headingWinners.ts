import { Winners } from "../view/winners/winners";
import { DataServerWins } from "../../types/interface";

export class HeadingWinners extends Winners {
  constructor() {
    super();
  }

  public async checkCarToWinners(numCar: string, carMaxSpeed: number) {
    const response = (await this.controller.getCarOrWinners(
      numCar,
      "winners"
    )) as Response;
    if (response.status === 404) {
      this.controller.createWinner(+numCar, 1, carMaxSpeed);
    } else {
      const data: DataServerWins = await response.json();
      if (data.time > carMaxSpeed) {
        const wins = data.wins + 1;
        this.controller.updateWinners(numCar, wins, carMaxSpeed);
      }
    }
  }
}
