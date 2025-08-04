import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Employee } from "../../types/employee";

@customElement("employee-card")
export class EmployeeCard extends LitElement {
  @property()
  declare employee: Employee;

  handleDelete() {
    this.dispatchEvent(new CustomEvent("delete", { detail: this.employee.id }));
  }

  static styles = [
    css`
      .employee-card {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem 0;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .employee-field div:first-child {
        font-weight: light;
        font-size: 0.9rem;
        color: #9c9c9cff;
      }

      .employee-field div:second-child {
        font-weight: bold;
        font-size: 1rem;
        color: #333;
      }

      .actions {
        display: flex;
      }
    `,
  ];

  render() {
    return html`
      <div class="employee-card">
        ${Object.keys(this.employee)
          .filter((key) => key !== "id")
          .map((key) => {
            return html`
              <div class="employee-field">
                <div>${key}:</div>
                <div>${this.employee[key as keyof Employee]}</div>
              </div>
            `;
          })}
        <div class="employee-actions">
          <a href="employee/${this.employee.id}">Edit</a>
          <button @click=${this.handleDelete}>Delete</button>
        </div>
      </div>
    `;
  }
}
