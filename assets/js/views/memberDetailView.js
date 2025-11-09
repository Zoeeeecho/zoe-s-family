// v12 — sectioned profile page per your spec
import { h } from "../core/dom.js?v=9";

export class MembersDetailView {
  constructor(root){ this.root = root; }

  render(m){
    this.root.innerHTML = "";

    // Header / back
    this.root.append(
      section("",
        h("a", { href: "members.html", class: "tab" }, "← Back to Family"),
        h("h2", {}, m.name || "—"),
        h("div", { class: "small" }, m.role || "")
      )
    );

    // Hero row
    const photo = m.avatar
      ? h("img",{src:m.avatar,alt:m.name,style:"width:140px;height:140px;border-radius:50%;object-fit:cover"})
      : circleInitial(m.name);

    const mbtiTag = m.mbti ? tag(m.mbti) : null;

    this.root.append(
      section("",
        h("div", { class:"row", style:"align-items:center;gap:18px" },
          photo,
          h("div", {},
            mbtiTag ? h("div", { class:"row", style:"gap:8px;flex-wrap:wrap;margin:4px 0" }, mbtiTag) : "",
            m.details && m.details.Location ? h("p", { class:"small" }, `Location: ${m.details.Location}`) : ""
          )
        )
      )
    );

    // --- Your requested sections (each its own card) ---
    this.root.append(
      infoCard("Birthday", formatDate(m.birthday) || "—"),
      listCard("Interests", m.interests),
      infoCard("MBTI", m.mbti || "—"),
      infoCard("Current occupation", m.occupation || "—"),
      listCard("Good at", m.strengths),
      listCard("Future plans", m.futurePlans),
      twoColumnCard("Advantages & Weaknesses",
        listify(m.advantages), listify(m.weaknesses), "Advantages", "Weaknesses"
      ),
      this.#gallery(m) // optional photos folder; auto hides if none
    );
  }

  renderNotFound(id){
    this.root.innerHTML = "";
    this.root.append(
      section("",
        h("a", { href: "members.html", class: "tab" }, "← Back to Family"),
        h("h2", {}, "Member not found"),
        h("p", {}, `No member with id="${id}".`)
      )
    );
  }

  #gallery(m){
    const baseDir = `assets/image/members/${m.id}/`;
    const guesses = [1,2,3,4,5,6].map(n => `${baseDir}${n}.jpg`);
    const row = h("div",{class:"row",style:"gap:12px;flex-wrap:wrap"});
    let added = 0;
    guesses.forEach(src=>{
      const img = h("img",{src,alt:"",style:"width:160px;height:160px;object-fit:cover;border-radius:12px"});
      img.onerror = () => img.remove();
      img.onload = () => { added++; };
      row.append(img);
    });
    const card = section("Photos", row);
    setTimeout(()=>{ if(!row.querySelector("img")) card.remove(); }, 150);
    return card;
  }
}

/* ---------- tiny helpers ---------- */

function section(title, ...children){
  const card = h("section", { class: "card" });
  if (title) card.append(h("h3", {}, title));
  children.forEach(c => card.append(c));
  return card;
}

function infoCard(title, text){
  return section(title, h("p", {}, text));
}

function listCard(title, arr){
  const items = listify(arr);
  if (!items) return section(title, h("p", { class:"small" }, "—"));
  const ul = h("ul", { style:"margin-left:16px;line-height:1.8" });
  items.forEach(t => ul.append(h("li", {}, t)));
  return section(title, ul);
}

function twoColumnCard(title, leftList, rightList, leftLabel="Left", rightLabel="Right"){
  const wrap = h("div", { class:"row", style:"gap:24px;align-items:flex-start;flex-wrap:wrap" });
  const col = (label, list) => {
    const box = h("div", { style:"min-width:240px;flex:1" },
      h("div", { class:"small", style:"margin-bottom:6px;opacity:.8" }, label),
      list ? listToUl(list) : h("p", { class:"small" }, "—")
    );
    return box;
  };
  wrap.append(col(leftLabel, leftList), col(rightLabel, rightList));
  return section(title, wrap);
}

function listify(x){
  if (!x) return null;
  if (Array.isArray(x)) return x;
  const s = String(x).trim();
  if (!s) return null;
  // allow comma-separated string
  return s.includes(",") ? s.split(",").map(t=>t.trim()).filter(Boolean) : [s];
}

function listToUl(arr){
  const ul = h("ul", { style:"margin-left:16px;line-height:1.8" });
  arr.forEach(t => ul.append(h("li", {}, t)));
  return ul;
}

function tag(text){
  const el = document.createElement("span");
  el.className = "tab";
  el.textContent = text;
  return el;
}

function circleInitial(name){
  return h("div", {
    style:"width:140px;height:140px;border-radius:50%;display:grid;place-items:center;background:#2b2f3a;color:#cfd3ff;font-size:48px;font-weight:700"
  }, (name||"?").slice(0,1).toUpperCase());
}

function formatDate(s){
  if (!s) return "";
  // Accept YYYY-MM-DD or any Date-parsable string
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s; // keep original if parsing fails
  return d.toLocaleDateString(undefined, { year:"numeric", month:"long", day:"numeric" });
}
