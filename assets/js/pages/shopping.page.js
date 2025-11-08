import { nav } from "../core/nav.js";
import { ShoppingView } from "../views/shoppingView.js";
import { ShoppingController } from "../controllers/shoppingController.js";

nav();
const root = document.body.appendChild(document.createElement("main"));
root.className = "container";

const view = new ShoppingView(root);
const ctrl = new ShoppingController(view);
ctrl.refresh();
