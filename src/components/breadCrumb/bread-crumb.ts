import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("bread-crumb")
export class BreadCrumb extends LitElement {
  @property()
  declare title: string;

  static styles = [
    css`
      .breadcrumb {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding: 1rem 2rem;
        box-sizing: border-box;
      }

      .breadcrumb-title {
        color: var(--primary-color);
        font-size: 1.5rem;
      }
      .actions-container {
        display: flex;
        gap: 1rem;
      }
    `,
  ];

  render() {
    return html` <div class="breadcrumb">
      <div class="breadcrumb-title">${this.title}</div>
      <div class="actions-container">
        <slot></slot>
      </div>
    </div>`;
  }
}
