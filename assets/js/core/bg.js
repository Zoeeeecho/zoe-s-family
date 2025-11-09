// v2 — normalize to root-relative so CSS resolves correctly
export function setPageBackground(url, opts = {}) {
  const r = (k, v) => document.documentElement.style.setProperty(k, v);

  let normalized = "none";
  if (url) {
    if (/^https?:\/\//i.test(url)) {
      normalized = url;                    // absolute http(s)
    } else if (url.startsWith("/")) {
      normalized = url;                    // already root-relative
    } else {
      normalized = `/${url}`;              // make it root-relative
    }
  }
  r("--page-bg", normalized === "none" ? "none" : `url("${normalized}")`);

  if (opts.opacity !== undefined) r("--page-bg-opacity", String(opts.opacity));
  if (opts.blur    !== undefined) r("--page-bg-blur",    `${opts.blur}px`);
  if (opts.scale   !== undefined) r("--page-bg-scale",   String(opts.scale));
}
