import { LitElement, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";

@customElement("employee-edit")
export class HomePage extends LitElement {
  @property({ type: String })
  declare user: string;

  onBeforeEnter(location: any) {
    this.user = location.params.user;
  }

  render() {
    return html`<h2>${this.user}</h2>`;
  }
}
