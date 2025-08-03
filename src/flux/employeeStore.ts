import { dispatcher, Action } from "./dispatcher";
import type { Employee } from "../types/employee";
import { deleteEmployee } from "../services/employeeService";

class EmployeeStore {
  private state = { employees: [] as Array<Employee> };
  private listeners: (() => void)[] = [];

  constructor() {
    dispatcher.register(this.handleAction.bind(this));
  }

  private handleAction(action: Action) {
    switch (action.type) {
      case "ADD_EMPLOYEE":
        this.state.employees.push(action.payload);
        this.notify();
        break;
      case "DELETE_EMPLOYEE":
        this.deleteEmployee(action.payload.id);
        break;
    }
  }

  getState() {
    return this.state;
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.state.employees.find((employee) => employee.id === id);
  }

  deleteEmployee(employeeId: string) {
    this.state.employees = this.state.employees.filter(
      (employee) => employee.id !== employeeId
    );
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }
}

export const employeeStore = new EmployeeStore();
