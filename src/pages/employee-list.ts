import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Employee } from "../types/employee";
import { employeeStore } from "../flux/employeeStore";
import { deleteEmployee } from "../services/employeeService";
import "../components/employeeCard/employee-card";
import "../components/warningModal/warning-modal";
import "../components/customTable/custom-table";
import "../components/breadCrumb/bread-crumb";
import "../components/pagination/pagination";
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
  @state()
  declare activePage: number;

  constructor() {
    super();
    this.showTable = true;
    this.activePage = 0;
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

  private onPageChange(event: CustomEvent) {
    this.activePage = event.detail;
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
      ${this.employeeToDelete &&
      html`<warning-modal
        header=${`Are you sure?`}
        @close=${this.closeWarningModal}
        @proceed=${this.confirmDelete}
      >
        Selected employee of record
        ${html`
          <b>
            ${this.employees.find((x) => x.id === this.employeeToDelete)
              ?.firstName}
            ${this.employees.find((x) => x.id === this.employeeToDelete)
              ?.lastName}
          </b>
        `}
        will be deleted.</warning-modal
      >`}
      ${this.showTable
        ? html`<custom-table
            .data="${this.employees.slice(
              this.activePage * 10,
              (this.activePage + 1) * 10 > this.employees.length
                ? this.employees.length
                : (this.activePage + 1) * 10
            )}"
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
            ${this.employees
              .slice(
                this.activePage * 10,
                (this.activePage + 1) * 10 > this.employees.length
                  ? this.employees.length
                  : (this.activePage + 1) * 10
              )
              .map(
                (employee) =>
                  html`<employee-card
                    .employee="${employee}"
                    @delete=${this.onDeleteEmployee}
                  ></employee-card>`
              )}
          </div>`}
      <div>
        <custom-pagination
          @pageChange=${this.onPageChange}
          .activePage="${this.activePage}"
          .pageCount="${Math.ceil(this.employees.length / 10)}"
        ></custom-pagination>
      </div> `;
  }
}
