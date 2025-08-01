import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Employee } from "../types/employee";
import { employeeStore } from "../flux/employeeStore";
import { addEmployee } from "../services/employeeService";
import dayjs from "dayjs";

@customElement("employee-list")
export class HomePage extends LitElement {
  @state()
  declare employees: Array<Employee>;

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

  render() {
    return html`<button @click="${this.addDemoEmployee}">cacik</button>
      <h2>this is list page ${this.employees.length}</h2>`;
  }
}
