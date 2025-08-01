import { dispatcher, Action } from "./dispatcher";
import type { Employee } from "../types/employee";

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
    }
  }

  getState() {
    return this.state;
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }
}

export const employeeStore = new EmployeeStore();
