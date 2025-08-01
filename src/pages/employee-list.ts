import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("employee-list")
export class HomePage extends LitElement {
  render() {
    return html`<h2>this is list page</h2>`;
  }
}
