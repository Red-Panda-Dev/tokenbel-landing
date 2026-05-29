import "./main.css";

// Auto-insert <wbr> tags before special characters for word breaking
document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll(".wbr-break");
  if (!els.length) return;
  requestAnimationFrame(() => {
    els.forEach((el) => {
      const t = el.textContent;
      const html = t.replace(/([_().:])/g, "<wbr>$1");
      if (html !== t) el.innerHTML = html;
    });
  });
});
