// v8 — exposes archiveNow() so the page can call it via event delegation
import { Storage } from "../core/storage.js?v=8";

export class ShoppingController {
  constructor(view){
    this.view = view;
    this.state = {
      list:    Storage.getShopping(),
      archive: Storage.getShoppingArchive(),
      historyOpen: false
    };

    // normal bindings
    view.onAdd    = () => { const t = this.#read(); if(!t) return; this.state.list = [this.#item(t), ...this.state.list]; this.#sync(); };
    view.onToggle = (id) => { this.state.list = this.state.list.map(x => x.id===id ? {...x, done:!x.done} : x); this.#sync(); };
    view.onDel    = (id) => { this.state.list = this.state.list.filter(x => x.id!==id); this.#sync(); };
    view.onArchiveCompleted = () => this.archiveNow(); // still keep view binding
    view.onToggleHistory    = () => { this.state.historyOpen = !this.state.historyOpen; this.refresh(); };
    view.onClearHistory     = () => { this.state.archive = []; Storage.setShoppingArchive([]); this.refresh(); };
    view.onDeleteFromHistory= (id) => { this.state.archive = this.state.archive.filter(a=>a.id!==id); Storage.setShoppingArchive(this.state.archive); this.refresh(); };
    view.onRestore          = (id) => {
      const rec = this.state.archive.find(a=>a.id===id); if(!rec) return;
      this.state.list = [this.#item(rec.text), ...this.state.list];
      this.state.archive = this.state.archive.filter(a=>a.id!==id);
      Storage.setShopping(this.state.list); Storage.setShoppingArchive(this.state.archive);
      this.refresh();
    };

    console.log("ShoppingController v8 bound");
  }

  refresh(){ this.view.render(this.state); }

  // ⬇️ public method the page can call
  archiveNow(){
    const completed = this.state.list.filter(x => x.done);
    console.log("archiveNow() ->", completed.length, "items");
    if (!completed.length) return;

    const toArchive = completed.map(x => ({ id:x.id, text:x.text, archivedAt:Date.now() }));
    this.state.archive = [...toArchive, ...this.state.archive];
    this.state.list = this.state.list.filter(x => !x.done);
    Storage.setShopping(this.state.list);
    Storage.setShoppingArchive(this.state.archive);
    this.state.historyOpen = true;
    this.refresh();
  }

  #item(text){ return { id: crypto.randomUUID(), text, done:false }; }
  #read(){ return (document.getElementById("text")?.value || "").trim(); }
  #sync(){ Storage.setShopping(this.state.list); const inp=document.getElementById("text"); if(inp) inp.value=""; this.refresh(); }
}

console.log("ShoppingController v8 loaded");
