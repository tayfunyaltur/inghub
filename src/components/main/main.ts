import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "../../pages/employee-edit.ts";
import "../../pages/employee-list.ts";
import "../../router.ts";

@customElement("main-app")
export class MyApp extends LitElement {
  static styles = css`
    nav {
      background: #333;
      padding: 1rem;
    }
    nav a {
      color: white;
      margin-right: 1rem;
      text-decoration: none;
    }
    #router-slot {
      padding: 1rem;
      background: #f0f0f0;
      min-height: 200px;
    }
  `;

  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/employee/new">About</a>
      </nav>
      <main id="router-slot"></main>
    `;
  }
}
