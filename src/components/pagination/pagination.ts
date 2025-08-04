import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import _ from "lodash";
import "../customButton/custom-button";

@customElement("custom-pagination")
export class Pagination extends LitElement {
  @property()
  declare activePage: number;
  @property()
  declare pageCount: number;
  @state()
  declare paginationSize: string;

  constructor() {
    super();
    this.activePage = 0;
    window.addEventListener("resize", (val) => {
      if (window.innerWidth < 600) {
        this.paginationSize = "small";
      } else {
        this.paginationSize = "medium";
      }
    });
  }

  handlePageChange(targetPage: number) {
    this.dispatchEvent(
      new CustomEvent("pageChange", {
        detail: targetPage,
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = [
    css`
      .pagination-container {
        display: flex;
        margin-top: 1rem;
      }
      .pages {
        margin: auto;
        display: flex;
        gap: 1rem;
      }
    `,
  ];

  render() {
    return html` <div class="pagination-container">
      ${this.activePage > 0
        ? html`<custom-button
            size=${this.paginationSize}
            variant="secondary"
            buttonStyle="outline"
            @click=${() => {
              this.handlePageChange(this.activePage - 1);
            }}
            >prev</custom-button
          >`
        : ""}
      <div class="pages">
        ${this.activePage < 4
          ? html`${_.range(0, 5).map(
                (x) => html`<custom-button
                  size=${this.paginationSize}
                  variant="secondary"
                  buttonStyle="outline"
                  buttonStyle="${x == this.activePage ? "default" : "outline"}"
                  @click=${() => {
                    this.handlePageChange(x);
                  }}
                  >${x + 1}</custom-button
                >`
              )}
              <div>...</div>
              <custom-button
                size=${this.paginationSize}
                variant="secondary"
                @click=${() => {
                  this.handlePageChange(this.pageCount - 1);
                }}
                buttonStyle="${this.pageCount - 1 == this.activePage
                  ? "default"
                  : "outline"}"
                >${this.pageCount}</custom-button
              > `
          : ""}
        ${this.activePage >= 4 && this.activePage < this.pageCount - 4
          ? html`<custom-button
                size=${this.paginationSize}
                variant="secondary"
                @click=${() => {
                  this.handlePageChange(1);
                }}
                buttonStyle="${1 == this.activePage ? "default" : "outline"}"
                >1</custom-button
              >
              <div>...</div>
              ${_.range(
                this.activePage - 2,
                this.activePage + 2 < this.pageCount
                  ? this.activePage + 2
                  : this.pageCount
              ).map(
                (x) =>
                  html` <custom-button
                    size=${this.paginationSize}
                    variant="secondary"
                    @click=${() => {
                      this.handlePageChange(x);
                    }}
                    buttonStyle="${x == this.activePage
                      ? "default"
                      : "outline"}"
                    >${x + 1}</custom-button
                  >`
              )}
              <div>...</div>
              <custom-button
                size=${this.paginationSize}
                variant="secondary"
                @click=${() => {
                  this.handlePageChange(this.pageCount - 1);
                }}
                buttonStyle="${this.pageCount - 1 == this.activePage
                  ? "default"
                  : "outline"}"
                >${this.pageCount}</custom-button
              > `
          : ""}
        ${this.activePage + 5 > this.pageCount
          ? html`<custom-button
                size=${this.paginationSize}
                variant="secondary"
                @click=${() => {
                  this.handlePageChange(1);
                }}
                buttonStyle="${1 == this.activePage ? "default" : "outline"}"
                >1</custom-button
              >
              <div>...</div>
              ${_.range(this.pageCount - 5, this.pageCount).map(
                (x) => html`<custom-button
                  size=${this.paginationSize}
                  type="button"
                  variant="secondary"
                  buttonStyle="outline"
                  buttonStyle="${x == this.activePage ? "default" : "outline"}"
                  @click=${() => {
                    this.handlePageChange(x);
                  }}
                  >${x + 1}</custom-button
                >`
              )}`
          : ""}
      </div>
      ${this.activePage < this.pageCount - 1
        ? html`<custom-button
            size=${this.paginationSize}
            variant="secondary"
            buttonStyle="outline"
            @click=${() => {
              this.handlePageChange(this.activePage + 1);
            }}
            >next</custom-button
          >`
        : ""}
    </div>`;
  }
}
