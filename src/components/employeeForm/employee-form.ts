import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Employee } from "../../types/employee";

@customElement("employee-form")
export class EmployeeForm extends LitElement {
  @property()
  declare employee: Employee;

  static styles = css`
    form {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 1rem;
    }

    form .actions {
      display: flex;
      grid-column: span 3;
      margin-top: 1rem;
    }

    form .actions * {
      width: 100%;
    }

    form div:not(.actions) {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
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
        <input type="text" id="firstName" name="firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required />
      </div>
      <div>
        <label for="emailAddress">Email Address:</label>
        <input type="email" id="emailAddress" name="emailAddress" required />
      </div>
      <div>
        <label for="dateOfBirth">Date of Birth:</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" required />
      </div>
      <div>
        <label for="dateOfEmployment">Date of Employment:</label>
        <input
          type="date"
          id="dateOfEmployment"
          name="dateOfEmployment"
          required
        />
      </div>
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" />
      </div>
      <div>
        <label for="department">Department:</label>
        <select id="department" name="department" required>
          <option value="Analytics">Analytics</option>
          <option value="Tech">Tech</option>
        </select>
      </div>
      <div>
        <label for="position">Position:</label>
        <select id="position" name="position" required>
          <option value="Junior">Junior</option>
          <option value="Medior">Medior</option>
          <option value="Senior">Senior</option>
        </select>
      </div>
      <div class="actions">
        <button type="submit">Submit</button>
        <a href="/">Cancel</a>
      </div>
    </form>`;
  }
}
