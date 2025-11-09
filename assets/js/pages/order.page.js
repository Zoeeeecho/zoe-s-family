// v1 — Order
import { nav } from "../core/nav.js?v=9";
import { setPageBackground } from "../core/bg.js?v=1";
import { OrderView } from "../views/orderView.js?v=1";
import { OrderController } from "../controllers/orderController.js?v=1";

setPageBackground("assets/image/bg/home.jpg", { opacity: .42, blur: 16 });
nav();

const root = document.body.appendChild(document.createElement("main"));
root.className = "container";

const v = new OrderView(root);
const c = new OrderController(v);
c.refresh();

console.log("order.page v1 loaded");
