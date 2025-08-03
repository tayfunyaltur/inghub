import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Employee } from "../types/employee";
import { employeeStore } from "../flux/employeeStore";
import { addEmployee, deleteEmployee } from "../services/employeeService";
import "../components/employeeCard/employee-card";
import "../components/warningModal/warning-modal";
import dayjs from "dayjs";

@customElement("employee-list")
export class EmployeeList extends LitElement {
  @state()
  declare employees: Array<Employee>;
  @state()
  declare employeeToDelete?: string;

  private addDemoEmployee() {
    const demoEmployee: Employee = {
      firstName: "Demo",
      lastName: "Employee",
      emailAddress: "Demo@employee.com",
      dateOfBirth: dayjs().format("DD/MM/YYYY").toString(),
      dateOfEmployment: dayjs().format("DD/MM/YYYY").toString(),
      phoneNumber: "+905414160662",
      department: "Tech",
      position: "Senior",
    };

    addEmployee(demoEmployee);
  }

  connectedCallback() {
    super.connectedCallback();
    employeeStore.subscribe(() => {
      this.employees = [...employeeStore.getState().employees];
    });
    this.employees = [...employeeStore.getState().employees];
  }

  private closeWarningModal() {
    this.employeeToDelete = undefined;
  }

  private onDeleteEmployee(event: MouseEvent) {
    this.employeeToDelete = event.detail.toString();
  }

  private confirmDelete() {
    if (this.employeeToDelete) {
      deleteEmployee(this.employeeToDelete);
      this.employeeToDelete = undefined;
    }
  }

  static styles = css`
    .employee-card-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
      gap: 1rem;
    }
  `;

  render() {
    return html`<button @click="${this.addDemoEmployee}">cacik</button>
      ${this.employeeToDelete &&
      html`<warning-modal
        @close=${this.closeWarningModal}
        @proceed=${this.confirmDelete}
      >
        >TEST</warning-modal
      >`}
      <div class="employee-card-container">
        ${this.employees.map(
          (employee) =>
            html`<employee-card
              .employee="${employee}"
              @delete=${this.onDeleteEmployee}
            ></employee-card>`
        )}
      </div> `;
  }
}
