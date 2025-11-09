// v1 — Home
import { nav } from "../core/nav.js?v=9";
import { h } from "../core/dom.js?v=9";
import { setPageBackground } from "../core/bg.js?v=1";

setPageBackground("assets/image/bg/home.jpg", { opacity: .38, blur: 14 });
nav();

const root = document.body.appendChild(document.createElement("main"));
root.className = "container";

root.append(
  h("section", { class: "card" },
    h("h2", {}, "Welcome home ✨"),
    h("p", { class: "small" },
      "This is your private family website. Data is saved locally on each device. ",
      "You can enable syncing later for shared pages like Shopping / Order."
    )
  )
);

console.log("home.page v1 loaded");
