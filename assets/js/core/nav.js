// v5
import { h } from "./dom.js?v=9";
console.log("nav v9 ready");


export function nav() {
  const bar = h("header", {}, h("div", { class: "container" },
    h("nav", {},
      h("div", { class: "brand" }, "🫶 Zoe Family"),
      h("div", { class: "tabs" },
        a("index.html","Home"),
        a("members.html","Family"),
        a("recipes.html","Recipes"),
        a("shopping.html","Shopping"),
        a("order.html","Order")
      )
    )
  ));
  document.body.prepend(bar);

  function a(href,label){ const el=document.createElement("a"); el.href=href; el.textContent=label; el.className="tab"; return el; }
  console.log("nav v5 ready");
}
