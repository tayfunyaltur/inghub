import { Router } from "@vaadin/router";

window.addEventListener("DOMContentLoaded", () => {
  const outlet = document
    .querySelector("main-app")
    ?.shadowRoot?.getElementById("router-slot");

  if (outlet) {
    const router = new Router(outlet);
    router.setRoutes([
      { path: "/", component: "employee-list" },
      { path: "/employee/:user", component: "employee-edit" },
    ]);
  }
});
