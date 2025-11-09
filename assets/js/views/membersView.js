// v4 — list shows ONLY avatar + name + role. Click -> member.html?id=...
import { h } from "../core/dom.js?v=9";

export class MembersView {
  constructor(root){ this.root = root; }

  render(list){
    this.root.innerHTML = "";

    const card = h("section", { class: "card" },
      h("h2", {}, "👨‍👩‍👧 Family Members"),
      h("p", { class: "small" }, "Tap a card to view full profile")
    );

    const grid = h("div", { class: "grid" });

    list.forEach(m => {
      const a = h("a", {
        href: `member.html?id=${encodeURIComponent(m.id)}`,
        style: "text-decoration:none;color:inherit;display:block"
      }, this.#card(m));
      grid.append(a);
    });

    card.append(grid);
    this.root.append(card);
  }

  #card(m){
    const wrap = h("div", { class: "card", style:"cursor:pointer" });
    const avatar = this.#avatar(m);
    const title  = h("div", {},
      h("strong", {}, m.name || "—"),
      " — ",
      m.role || ""
    );
    // NOTE: no subtitle/notes here on purpose
    wrap.append(h("div", { class: "row" }, avatar, h("div", {}, title)));
    return wrap;
  }

  #avatar(m){
    const box = h("div", { class: "avatar" });
    if (m.avatar) {
      const img = h("img", { src: m.avatar, alt: m.name, style: "width:64px;height:64px;border-radius:50%;object-fit:cover" });
      img.onerror = () => { box.textContent = (m.name||"?").slice(0,1).toUpperCase(); };
      box.append(img);
    } else {
      box.textContent = (m.name||"?").slice(0,1).toUpperCase();
    }
    box.style.cssText = "width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:#2b2f3a;color:#cfd3ff;margin-right:12px;font-weight:700;";
    return box;
  }
}
