import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "../../pages/employee-edit.ts";
import "../../pages/employee-list.ts";
import "../../router.ts";

@customElement("main-app")
export class MyApp extends LitElement {
  static styles = css`
    nav {
      background: #white;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
    }
    nav span {
      margin-left: 0.5rem;
    }
    nav a {
      color: white;
      margin-right: 1rem;
      text-decoration: none;
      color: var(--primary-color);
    }
    nav a:first-of-type {
      margin-left: auto;
    }
    #router-slot {
      padding: 1rem;
      padding-bottom: 4rem;
      box-sizing: border-box;
      background: #f0f0f0;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
    .app-container {
      width: 100%;
      height: 100dvh;
      overflow: hidden;
    }
  `;

  render() {
    return html`
      <div class="app-container">
        <nav>
          <img
            src="/assets/favicon.png"
            alt="Logo"
            style="height: 30px; vertical-align: middle;"
          />
          <span>ING</span>
          <a href="/">Employees</a>
          <a href="/employee/new">Add New</a>
        </nav>
        <main id="router-slot"></main>
      </div>
    `;
  }
}
