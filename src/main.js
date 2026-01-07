import "./main.css";

// Auto-insert <wbr> tags before special characters for word breaking
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".wbr-break").forEach((el) => {
    el.innerHTML = el.textContent.replace(/([_().:])/g, "<wbr>$1");
  });
});
