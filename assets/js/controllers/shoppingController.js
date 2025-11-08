import { Storage } from "../core/storage.js";

export class ShoppingController {
  constructor(view) {
    this.view = view;
    this.state = { list: Storage.getShopping() };

    view.onAdd = () => {
      const t = view.read();
      if (!t) return;
      this.state.list = [{ id: crypto.randomUUID(), text: t, done: false }, ...this.state.list];
      Storage.setShopping(this.state.list);
      view.clear();
      this.refresh();
    };

    view.onToggle = (id) => {
      this.state.list = this.state.list.map(x => x.id === id ? { ...x, done: !x.done } : x);
      Storage.setShopping(this.state.list);
      this.refresh();
    };

    view.onDel = (id) => {
      this.state.list = this.state.list.filter(x => x.id !== id);
      Storage.setShopping(this.state.list);
      this.refresh();
    };

    view.onClearDone = () => {
      this.state.list = this.state.list.filter(x => !x.done);
      Storage.setShopping(this.state.list);
      this.refresh();
    };
  }

  refresh() {
    this.view.render(this.state);
  }
}
