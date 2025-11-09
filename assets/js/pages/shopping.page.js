// v1 — Shopping
import { nav } from "../core/nav.js?v=9";
import { setPageBackground } from "../core/bg.js?v=1";
import { ShoppingView } from "../views/shoppingView.js?v=8";
import { ShoppingController } from "../controllers/shoppingController.js?v=8";

setPageBackground("assets/image/bg/recipes.jpg", { opacity: .42, blur: 16 });
nav();

const root = document.body.appendChild(document.createElement("main"));
root.className = "container";

const view = new ShoppingView(root);
const ctrl = new ShoppingController(view);
ctrl.refresh();

// keep the global delegate if you still use it
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#archiveBtn");
  if (btn && !btn.disabled) {
    e.preventDefault();
    ctrl.archiveNow?.();
  }
});

console.log("shopping.page v1 loaded");
