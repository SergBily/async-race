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
}
