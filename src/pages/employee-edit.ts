import { LitElement, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import "../components/employeeForm/employee-form";
import { addEmployee } from "../services/employeeService";

@customElement("employee-edit")
export class HomePage extends LitElement {
  @property({ type: String })
  declare user: string;

  onBeforeEnter(location: any) {
    this.user = location.params.user;
  }

  private handleSave(event: CustomEvent) {
    const employee = event.detail;
    if (this.user === "new") {
      addEmployee(employee);
    }
    console.log("Employee saved:", employee);
  }

  render() {
    return html`<employee-form @save=${this.handleSave}></employee-form>`;
  }
}
