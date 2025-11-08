// Tiny DOM helpers
export const qs = (s, el = document) => el.querySelector(s);
export const qsa = (s, el = document) => [...el.querySelectorAll(s)];

export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) {
      // normalize onClick/onchange → "click"/"change"
      el.addEventListener(k.slice(2).toLowerCase(), v);
    } else el.setAttribute(k, v);
  }
  kids.flat().forEach((k) => el.append(k?.nodeType ? k : document.createTextNode(k)));
  return el;
}
