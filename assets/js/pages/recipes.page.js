import { nav } from "../core/nav.js";
import { RecipesView } from "../views/recipesView.js";
import { RecipesController } from "../controllers/recipesController.js";

nav();
const root = document.body.appendChild(document.createElement("main"));
root.className = "container";
const view = new RecipesView(root);
const controller = new RecipesController(view);
controller.refresh();
