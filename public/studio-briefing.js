(() => {
  const trigger = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!trigger || !menu) return;

  const setOpen = (open) => {
    trigger.setAttribute("aria-expanded", String(open));
    trigger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    if (open) {
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    } else {
      trigger.focus();
    }
  };

  trigger.addEventListener("click", () => {
    setOpen(trigger.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
      event.preventDefault();
      setOpen(false);
    }
  });
})();
