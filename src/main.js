import "./main.css";

// Auto-insert <wbr> tags before special characters for word breaking.
// SECURITY: Uses safe DOM APIs (textContent + createElement) only.
// Do NOT change this to innerHTML, and do NOT feed untrusted/user-provided
// content into .wbr-break elements without re-reviewing.
document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll(".wbr-break");
  if (!els.length) return;
  const SPECIAL = /[_().:]/;
  requestAnimationFrame(() => {
    els.forEach((el) => {
      const text = el.textContent;
      if (!text || !SPECIAL.test(text)) return;
      const parts = text.split(/([_().:])/g);
      el.textContent = "";
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        if (!part) return;
        if (SPECIAL.test(part) && part.length === 1) {
          frag.appendChild(document.createElement("wbr"));
        }
        frag.appendChild(document.createTextNode(part));
      });
      el.appendChild(frag);
    });
  });
});
