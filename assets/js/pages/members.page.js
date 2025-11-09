// v2 — boot the read-only page + modal behavior
import { nav } from "../core/nav.js?v=9";
import { FAMILY } from "../data/family.js?v=3";
import { MembersView } from "../views/membersView.js?v=2";

nav();
const root = document.body.appendChild(document.createElement("main"));
root.className = "container";

const view = new MembersView(root);
view.render(FAMILY);

// clicking a card opens modal
view.onOpen = (member) => view.openProfile(member);

// ESC to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") view.closeProfile();
});

console.log("members.page v2");
