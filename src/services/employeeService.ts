import { dispatcher } from "../flux/dispatcher";
import type { Employee } from "../types/employee";
import { v4 as uuidv4 } from "uuid";

export function addEmployee(employee: Employee) {
  dispatcher.dispatch({
    type: "ADD_EMPLOYEE",
    payload: { id: uuidv4(), ...employee },
  });
}
