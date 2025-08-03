import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("bread-crumb")
export class BreadCrumb extends LitElement {
  @property()
  declare title: string;

  render() {
    return html` <div>
      <div>${this.title}</div>
      <div>
        <slot></slot>
      </div>
    </div>`;
  }
}
