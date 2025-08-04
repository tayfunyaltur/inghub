import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Employee } from "../../types/employee";
import "../customButton/custom-button";
import dayjs from "dayjs";
import { Router } from "@vaadin/router";

@customElement("employee-form")
export class EmployeeForm extends LitElement {
  @property()
  declare employee: Employee;

  static styles = css`
    form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 1rem;
      padding: 1rem;
      overflow: hidden;
    }

    form .actions {
      display: flex;
      grid-column: span 3;
      margin-top: 1rem;
      justify-content: center;
      gap: 2rem;
    }

    form .actions * {
      width: 400px;
      max-width: 40%;
    }

    form div:not(.actions) {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    form input,
    form select {
      border: 1px solid lightgray;
      font-size: 1rem;
      padding: 0.75rem 0.5rem;
    }

    @media (max-width: 600px) {
      :host form div:not(.actions) {
        grid-column: span 3;
      }
    }
  `;

  private handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const employee: Employee = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      emailAddress: formData.get("emailAddress") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      dateOfEmployment: formData.get("dateOfEmployment") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      department: formData.get("department") as Employee["department"],
      position: formData.get("position") as Employee["position"],
    };
    this.dispatchEvent(new CustomEvent("save", { detail: employee }));
  }

  render() {
    return html`<form @submit="${this.handleSubmit}">
      <div>
        <label for="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value=${this.employee?.firstName || ""}
          name="firstName"
          required
        />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value=${this.employee?.lastName || ""}
          name="lastName"
          required
        />
      </div>
      <div>
        <label for="emailAddress">Email Address:</label>
        <input
          type="email"
          id="emailAddress"
          value=${this.employee?.emailAddress || ""}
          name="emailAddress"
          required
        />
      </div>
      <div>
        <label for="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          value=${this.employee?.dateOfBirth
            ? dayjs(this.employee?.dateOfBirth).format("YYYY-MM-DD")
            : ""}
          name="dateOfBirth"
          required
        />
      </div>
      <div>
        <label for="dateOfEmployment">Date of Employment:</label>
        <input
          type="date"
          id="dateOfEmployment"
          value=${this.employee?.dateOfEmployment
            ? dayjs(this.employee?.dateOfEmployment).format("YYYY-MM-DD")
            : ""}
          name="dateOfEmployment"
          required
        />
      </div>
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value=${this.employee?.phoneNumber || ""}
          name="phoneNumber"
        />
      </div>
      <div>
        <label for="department">Department:</label>
        <select id="department" name="department" required>
          <option
            value="Analytics"
            selected=${this.employee?.department === "Analytics"}
          >
            Analytics
          </option>
          <option value="Tech" selected=${this.employee?.department === "Tech"}>
            Tech
          </option>
        </select>
      </div>
      <div>
        <label for="position">Position:</label>
        <select id="position" name="position" required>
          <option
            value="Junior"
            selected=${this.employee?.position === "Junior"}
          >
            Junior
          </option>
          <option
            value="Medior"
            selected=${this.employee?.position === "Medior"}
          >
            Medior
          </option>
          <option
            value="Senior"
            selected=${this.employee?.position === "Senior"}
          >
            Senior
          </option>
        </select>
      </div>
      <div class="actions">
        <custom-button type="submit" variant="primary" buttonStyle="default"
          >Submit</custom-button
        >
        <custom-button
          variant="secondary"
          buttonStyle="outline"
          @click=${() => {
            Router.go("/");
          }}
        >
          Cancel
        </custom-button>
      </div>
    </form>`;
  }
}
