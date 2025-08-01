export type Employee = {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfEmployment: string;
  dateOfBirth: string;
  phoneNumber: string;
  emailAddress: string;
  department: "Analytics" | "Tech";
  position: "Junior" | "Medior" | "Senior";
};
