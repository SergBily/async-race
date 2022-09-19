import { CurrentPage, DataServerBothPage } from "../../types/types";

export class Pagination {
  protected readonly pagination: HTMLDivElement;
  private readonly btnPrev: HTMLButtonElement;
  private readonly btnNext: HTMLButtonElement;

  constructor() {
    this.pagination = document.createElement("div");
    this.btnPrev = document.createElement("button");
    this.btnNext = document.createElement("button");
  }
  public createPaginationPage(): HTMLDivElement {
    this.pagination.classList.add("pagination");

    this.btnPrev.classList.add("btn", "pagination__prev");
    this.btnPrev.setAttribute("data-name", "prev");
    this.btnPrev.innerText = "previous";
    this.btnPrev.disabled = true;

    this.btnNext.classList.add("btn", "pagination__next");
    this.btnNext.setAttribute("data-name", "next");
    this.btnNext.innerText = "next";
    this.btnNext.disabled = true;

    this.pagination.append(this.btnPrev, this.btnNext);
    return this.pagination;
  }

  public controlPaginationBtn(allCar: number, curPage: number): void {
    const prev = document.querySelector(
        ".pagination__prev"
      ) as HTMLButtonElement,
      next = document.querySelector(".pagination__next") as HTMLButtonElement,
      limitCar = 7,
      allPage = Math.ceil(allCar / limitCar);

    if (curPage === allPage) {
      next.disabled = true;
      next.classList.remove("pagination__activ");
    } else if (curPage < allPage) {
      next.disabled = false;
      next.classList.add("pagination__activ");
    }

    if (curPage === 1) {
      prev.disabled = true;
      prev.classList.remove("pagination__activ");
    } else {
      prev.disabled = false;
      prev.classList.add("pagination__activ");
    }
  }

  public async switchOtherPage(btn: string, page: CurrentPage): Promise<void> {
    const namePage = page.constructor.name,
      response = (await page.controller.paginationPage(
        btn,
        namePage
      )) as Response,
      data: DataServerBothPage = await response.json(),
      numPage: string = (response.url.match(
        /page=\d*/
      ) as RegExpMatchArray)[0].split("=")[1];

    page.drawCars(data);
    this.drawNumPage(numPage, page);
  }

  public addListeners(page: CurrentPage): void {
    this.pagination.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).dataset.name as string;
      console.log(btn);

      this.switchOtherPage(btn, page);
    });
  }

  public drawNumPage(number: string, page: CurrentPage): void {
    const numPage = document.querySelector(".title__num") as HTMLSpanElement,
      totalCars = document.querySelector(".total__cars") as HTMLSpanElement,
      allCar = parseInt(totalCars.innerText);
    numPage.innerText = number;
    page.curPage = +number;

    this.controlPaginationBtn(allCar, page.curPage);
  }
}
