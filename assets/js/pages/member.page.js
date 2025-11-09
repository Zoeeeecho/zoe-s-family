// v10 — member detail page
import { nav } from "../core/nav.js?v=9";
import { MembersDetailView } from "../views/memberDetailView.js?v=10";
import { FAMILY } from "../data/family.js?v=3";

nav();

// mount root
const root = document.body.appendChild(document.createElement("main"));
root.className = "container";

function getId() {
  const u = new URL(window.location.href);
  return u.searchParams.get("id");
}

const id = getId();
const member = FAMILY.find(m => m.id === id);

const view = new MembersDetailView(root);
if (member) {
  view.render(member);
} else {
  view.renderNotFound(id);
}

console.log("member.page v10", { id });
