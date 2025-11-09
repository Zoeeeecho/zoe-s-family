// v3 — Family list page
import { nav } from "../core/nav.js?v=9";
import { setPageBackground } from "../core/bg.js?v=1";
import { FAMILY } from "../data/family.js?v=4";
import { MembersView } from "../views/membersView.js?v=4";

setPageBackground("assets/image/bg/family.jpg", { opacity: .40, blur: 16 });
nav();

const root = document.body.appendChild(document.createElement("main"));
root.className = "container";

const view = new MembersView(root);
view.render(FAMILY);

console.log("members.page v3 loaded");
