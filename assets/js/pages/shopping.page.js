// v8 — event delegation: click anywhere -> if #archiveBtn, call ctrl.archiveNow()
import { nav } from "../core/nav.js?v=9";
import { ShoppingView } from "../views/shoppingView.js?v=8";
import { ShoppingController } from "../controllers/shoppingController.js?v=8";
console.log("shopping.page v9");

nav();
const root = document.body.appendChild(document.createElement("main"));
root.className = "container";

const view = new ShoppingView(root);
const ctrl  = new ShoppingController(view);
ctrl.refresh();

// Global delegate so caching can’t break the button
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#archiveBtn");
  if (btn && !btn.disabled) {
    e.preventDefault();
    ctrl.archiveNow();
  }
});

console.log("shopping.page v8");
