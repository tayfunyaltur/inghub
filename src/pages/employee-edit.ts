import { LitElement, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import "../components/employeeForm/employee-form";
import { addEmployee } from "../services/employeeService";
import { Employee } from "../types/employee";
import { employeeStore } from "../flux/employeeStore";

@customElement("employee-edit")
export class HomePage extends LitElement {
  @property({ type: String })
  declare user: string;
  @state()
  declare employee?: Employee;

  connectedCallback() {
    super.connectedCallback();
    employeeStore.subscribe(() => {
      this.employee = employeeStore.getEmployeeById(this.user);
    });
    this.employee = employeeStore.getEmployeeById(this.user);
  }

  onBeforeEnter(location: any) {
    this.user = location.params.user;
  }

  private handleSave(event: CustomEvent) {
    const employee = event.detail;
    if (this.user === "new") {
      addEmployee(employee);
    }
  }

  render() {
    return html`<employee-form
      .employee=${this.employee}
      @save=${this.handleSave}
    ></employee-form>`;
  }
}
