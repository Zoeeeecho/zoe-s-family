import { Storage } from "../core/storage.js";
import { makeRecipe } from "../models/recipe.js";

export class RecipesController {
  constructor(view){
    this.view = view;
    this.state = { list: Storage.getRecipes() };
    this.view.onSave = async () => {
      const base = this.view.readForm();
      if(!base.title.trim()) return;
      const image = await this.view.readImage();
      const rec = makeRecipe({ ...base, image });
      this.state.list = [rec, ...this.state.list];
      Storage.setRecipes(this.state.list);
      this.view.clearForm();
      this.refresh();
    };
    this.view.onClear = () => this.view.clearForm();
    this.view.onDel = id => { this.state.list = this.state.list.filter(r=>r.id!==id); Storage.setRecipes(this.state.list); this.refresh(); };
    this.view.onDup = id => {
      const r = this.state.list.find(x=>x.id===id); if(!r) return;
      const copy = makeRecipe({...r, title:r.title+" (copy)"});
      this.state.list = [copy, ...this.state.list]; Storage.setRecipes(this.state.list); this.refresh();
    };
    this.view.onEdit = id => {
      // quick inline edit prompt (can replace with a dialog later)
      const r = this.state.list.find(x=>x.id===id); if(!r) return;
      const title = prompt("Title", r.title) ?? r.title;
      const tags  = (prompt("Tags (comma)", r.tags.join(", ")) ?? "").split(",").map(s=>s.trim()).filter(Boolean);
      const ingredients = (prompt("Ingredients (\\n)", r.ingredients.join("\n")) ?? "").split(/\n+/).filter(Boolean);
      const steps = (prompt("Steps (\\n)", r.steps.join("\n")) ?? "").split(/\n+/).filter(Boolean);
      const updated = {...r, title, tags, ingredients, steps, updatedAt:Date.now()};
      this.state.list = this.state.list.map(x=> x.id===id ? updated : x);
      Storage.setRecipes(this.state.list); this.refresh();
    };
    this.view.onSearch = _q => this.refresh(); // filtering is view-side
  }

  refresh(){ this.view.render(this.state); }
}
