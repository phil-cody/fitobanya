const container = document.querySelector(".accordeon");

container.addEventListener("click", (e) => {
  const block = e.target.closest("li");
  if (!block) return;

  const content = block.querySelector("p");
  if (!content) return;

  const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

  document.querySelectorAll("li").forEach((b) => {
    const el = b.querySelector("p");
    if (el) el.style.maxHeight = "0px";
    b.classList.remove("active");
  });

  if (!isOpen) {
    block.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";
  }
});