import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Employee } from "../types/employee";
import { employeeStore } from "../flux/employeeStore";
import { addEmployee, deleteEmployee } from "../services/employeeService";
import "../components/employeeCard/employee-card";
import "../components/warningModal/warning-modal";
import "../components/customTablle/custom-table";
import "../components/breadCrumb/bread-crumb";
import dayjs from "dayjs";
import { Router } from "@vaadin/router";

@customElement("employee-list")
export class EmployeeList extends LitElement {
  @state()
  declare employees: Array<Employee>;
  @state()
  declare employeeToDelete?: string;
  @state()
  declare showTable: boolean;

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
    const employeeId =
      (event.target as HTMLButtonElement).dataset.id || event.detail.toString();
    this.employeeToDelete = employeeId;
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
    return html`<bread-crumb title="Employee list">
        <button
          @click="${() => {
            this.showTable = true;
          }}"
        >
          Show Table
        </button>
        <button
          @click="${() => {
            this.showTable = false;
          }}"
        >
          Show Cards
        </button>
      </bread-crumb>
      ${this.employeeToDelete}
      ${this.employeeToDelete &&
      html`<warning-modal
        @close=${this.closeWarningModal}
        @proceed=${this.confirmDelete}
      >
        >TEST</warning-modal
      >`}
      ${this.showTable
        ? html`<custom-table
            .data="${this.employees}"
            .columns="${[
              { label: "First Name", field: "firstName", order: 1 },
              { label: "Last Name", field: "lastName", order: 2 },
              { label: "Email", field: "emailAddress", order: 3 },
              { label: "Phone Number", field: "phoneNumber", order: 4 },
              {
                label: "Date of Birth",
                field: "dateOfBirth",
                order: 5,
                render: (value: any) => dayjs(value).format("DD/MM/YYYY"),
              },
              {
                label: "Date of Employment",
                field: "dateOfEmployment",
                order: 6,
                render: (value: any) => dayjs(value).format("DD/MM/YYYY"),
              },
              { label: "Department", field: "department", order: 7 },
              { label: "Position", field: "position", order: 8 },
              {
                label: "Actions",
                field: "actions",
                order: 9,
                render: (value: any) => html`
              <button @click="${function () {
                Router.go(`/employee/${value.id}`);
              }}"">
                Edit
              </button>
              <button @click="${(e: MouseEvent) =>
                this.onDeleteEmployee(e)}" data-id="${value?.id}">
                Delete
              </button>
            `,
              },
            ]}"
          ></custom-table>`
        : html`<div class="employee-card-container">
            ${this.employees.map(
              (employee) =>
                html`<employee-card
                  .employee="${employee}"
                  @delete=${this.onDeleteEmployee}
                ></employee-card>`
            )}
          </div>`} `;
  }
}
