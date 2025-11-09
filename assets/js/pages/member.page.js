// v11 — Member detail page
import { nav } from "../core/nav.js?v=9";
import { setPageBackground } from "../core/bg.js?v=1";
import { FAMILY } from "../data/family.js?v=4";
import { MembersDetailView } from "../views/memberDetailView.js?v=12";

nav();

const params = new URL(location.href).searchParams;
const id = params.get("id");
const member = FAMILY.find(m => m.id === id);

// allow per-member page bg via data.backgrounds?.page
const bg = member?.backgrounds?.page || "assets/image/bg/family.jpg";
setPageBackground(bg, { opacity: .40, blur: 16 });

const root = document.body.appendChild(document.createElement("main"));
root.className = "container";

const view = new MembersDetailView(root);
member ? view.render(member) : view.renderNotFound(id);

console.log("member.page v11 loaded", { id });
