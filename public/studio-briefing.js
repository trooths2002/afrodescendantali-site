(() => {
  const trigger = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");

  if (trigger && menu) {
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
  }

  if (!window.__afrodescendantAliAnalyticsInitialized) {
    const measurementId = "G-11B3ZP3DH2";
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);

    const googleTag = document.createElement("script");
    googleTag.async = true;
    googleTag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) firstScript.parentNode.insertBefore(googleTag, firstScript);
    window.__afrodescendantAliAnalyticsInitialized = true;
  }

  const trackLeadIntent = (name, detail) => {
    const payload = {
      event: "lead_intent_click",
      name,
      detail: detail || {},
      path: window.location.pathname,
      ts: new Date().toISOString()
    };
    window.afrodescendantAliLeadEvents = window.afrodescendantAliLeadEvents || [];
    window.afrodescendantAliLeadEvents.push(payload);
    if (typeof window.gtag === "function") {
      window.gtag("event", "lead_intent_click", {
        lead_name: name,
        lead_path: window.location.pathname,
        lead_detail: JSON.stringify(detail || {})
      });
    }
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
    try {
      const key = "afrodescendantAliLeadEvents";
      const current = JSON.parse(window.localStorage.getItem(key) || "[]");
      current.push(payload);
      window.localStorage.setItem(key, JSON.stringify(current.slice(-100)));
    } catch (error) {}
  };

  document.querySelectorAll("[data-lead-track]").forEach((item) => {
    item.addEventListener("click", () => {
      trackLeadIntent(item.getAttribute("data-lead-track"), {
        text: (item.textContent || "").trim(),
        href: item.getAttribute("href") || ""
      });
    });
  });
})();