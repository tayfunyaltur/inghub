import { dispatcher } from "../flux/dispatcher";
import type { Employee } from "../types/employee";

export function addEmployee(employee: Employee) {
  dispatcher.dispatch({ type: "ADD_EMPLOYEE", payload: employee });
}
