import { h } from "../core/dom.js";

export class ShoppingView {
  constructor(root) { this.root = root; }

  render(state) {
    const { list } = state;
    this.root.innerHTML = "";

    // Add form
    const add = h("section", { class: "card" },
      h("h2", {}, "🛒 Shopping List"),
      h("div", { class: "row" },
        h("input", { id: "text", placeholder: "Add item…", style: "flex:1" }),
        h("button", { class: "btn", onClick: () => this.onAdd?.() }, "Add")
      )
    );

    // Items table
    const tableCard = h("section", { class: "card" }, h("h2", {}, "Items"));
    const t = h("table", { class: "table" });
    t.innerHTML = "<thead><tr><th>Item</th><th>Status</th><th></th></tr></thead>";
    const tb = document.createElement("tbody");

    list.forEach((i) => {
      const tr = document.createElement("tr");
      tr.append(h("td", {}, i.text));
      tr.append(h("td", {}, i.done ? "✔️" : "⏺️"));
      tr.append(h("td", {},
        h("button", { onClick: () => this.onToggle?.(i.id) }, i.done ? "Undo" : "Done"),
        " ",
        h("button", { onClick: () => this.onDel?.(i.id) }, "Delete")
      ));
      tb.append(tr);
    });

    t.append(tb);
    tableCard.append(t);
    tableCard.append(
      h("div", { class: "row" },
        h("button", { onClick: () => this.onClearDone?.() }, "Clear completed"),
        h("span", { class: "small right" }, `${list.filter(x => !x.done).length} to buy`)
      )
    );

    this.root.append(add, tableCard);

    // Allow Enter to add
    const input = document.getElementById("text");
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.onAdd?.();
    });
  }

  read() {
    return (document.getElementById("text").value || "").trim();
  }

  clear() {
    const el = document.getElementById("text");
    if (el) el.value = "";
  }
}
