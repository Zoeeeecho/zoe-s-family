// v1 — Recipes
import { nav } from "../core/nav.js?v=9";
import { setPageBackground } from "../core/bg.js?v=1";
import { RecipesView } from "../views/recipesView.js?v=1";
import { RecipesController } from "../controllers/recipesController.js?v=1";

setPageBackground("assets/image/bg/recipes.jpg", { opacity: .38, blur: 14 });
nav();

const root = document.body.appendChild(document.createElement("main"));
root.className = "container";

const view = new RecipesView(root);
const controller = new RecipesController(view);
controller.refresh();

console.log("recipes.page v1 loaded");
