import type { Employee } from "../types/employee";
import dayjs from "dayjs";

// Temel örnek datalar
const firstNames = [
  "Ahmet",
  "Ayşe",
  "Mehmet",
  "Fatma",
  "Can",
  "Zeynep",
  "Burak",
  "Elif",
  "Emre",
  "Selin",
  "Kerem",
  "Gamze",
  "Mert",
  "Ece",
  "Onur",
  "Deniz",
  "Berk",
  "Melis",
  "Tolga",
  "Esra",
];
const lastNames = [
  "Yılmaz",
  "Kara",
  "Demir",
  "Çelik",
  "Arslan",
  "Aydın",
  "Şahin",
  "Yıldız",
  "Güneş",
  "Polat",
  "Koç",
  "Eren",
  "Kaya",
  "Başar",
  "Sezer",
  "Tuna",
  "Gür",
  "Öztürk",
  "Akın",
  "Uçar",
];
const departments: Employee["department"][] = ["Analytics", "Tech"];
const positions: Employee["position"][] = ["Junior", "Medior", "Senior"];

// Random yardımcı fonksiyon
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone() {
  return `+9053${Math.floor(10000000 + Math.random() * 89999999)}`;
}

function randomDate(startYear: number, endYear: number) {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  const date = new Date(start + Math.random() * (end - start));
  return dayjs(date).format("YYYY-MM-DD");
}

export const employees: Employee[] = Array.from({ length: 150 }, (_, i) => {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  return {
    id: (i + 1).toString(),
    firstName,
    lastName,
    dateOfEmployment: randomDate(2018, 2024),
    dateOfBirth: randomDate(1985, 2000),
    phoneNumber: randomPhone(),
    emailAddress: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    department: randomItem(departments),
    position: randomItem(positions),
  };
});
