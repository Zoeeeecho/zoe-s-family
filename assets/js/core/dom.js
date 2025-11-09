// v9 — proper boolean & property handling
export const qs  = (s, el=document) => el.querySelector(s);
export const qsa = (s, el=document) => [...el.querySelectorAll(s)];

export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === "class") {
      el.className = v ?? "";
    } else if (k.startsWith("on")) {
      el.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (v === false || v === null || v === undefined) {
      // skip falsey boolean attrs entirely (prevents disabled="false")
      // do nothing
    } else if (v === true) {
      // set true boolean attrs correctly
      el.setAttribute(k, "");
      if (k in el) el[k] = true;
    } else {
      // prefer property assignment when possible
      if (k in el) { try { el[k] = v; } catch { el.setAttribute(k, String(v)); } }
      else el.setAttribute(k, String(v));
    }
  }
  kids.flat().forEach(k => el.append(k?.nodeType ? k : document.createTextNode(k)));
  return el;
}

console.log("dom.js v9 loaded");
