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

  const recordAudienceEvent = (name, detail) => {
    const payload = {
      event: "ada_audience_event",
      name,
      detail: detail || {},
      path: window.location.pathname,
      ts: new Date().toISOString()
    };
    window.afrodescendantAliAudienceEvents = window.afrodescendantAliAudienceEvents || [];
    window.afrodescendantAliAudienceEvents.push(payload);
    if (typeof window.gtag === "function") window.gtag("event", name, detail || {});
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
    try {
      const key = "afrodescendantAliAudienceEvents";
      const current = JSON.parse(window.localStorage.getItem(key) || "[]");
      current.push(payload);
      window.localStorage.setItem(key, JSON.stringify(current.slice(-200)));
    } catch (error) {}
  };

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
    if (/starter_brief|briefing/i.test(name || "")) recordAudienceEvent("briefing_request", { lead_name: name });
    if (/qualified_inquiry|contact_mailto/i.test(name || "")) recordAudienceEvent("qualified_inquiry", { lead_name: name });
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

  document.querySelectorAll("[data-story-link]").forEach((item) => {
    item.addEventListener("click", () => {
      recordAudienceEvent("story_click", {
        story_id: item.closest("[data-story-id]")?.getAttribute("data-story-id") || "",
        story_type: item.closest("[data-story-type]")?.getAttribute("data-story-type") || "",
        region: item.closest("[data-region]")?.getAttribute("data-region") || ""
      });
    });
  });

  document.querySelectorAll("[data-story-id]").forEach((item) => {
    recordAudienceEvent("story_impression", {
      story_id: item.getAttribute("data-story-id") || "",
      story_type: item.getAttribute("data-story-type") || "",
      region: item.getAttribute("data-region") || ""
    });
  });

  document.querySelectorAll("[data-publication-meta]").forEach((item) => {
    recordAudienceEvent("publishing_cadence_snapshot", {
      last_reviewed: item.getAttribute("data-last-reviewed") || "",
      cadence: item.getAttribute("data-cadence") || "",
      visible_stories: item.getAttribute("data-visible-stories") || ""
    });
  });

  try {
    const visitKey = "afrodescendantAliReaderVisits";
    const visits = Number(window.localStorage.getItem(visitKey) || "0") + 1;
    window.localStorage.setItem(visitKey, String(visits));
    recordAudienceEvent(visits > 1 ? "reader_returning" : "reader_first_visit", { visit_count: visits });
  } catch (error) {}

  document.querySelectorAll("[data-site-search]").forEach((root) => {
    const form = root.querySelector("[data-search-form]");
    const input = root.querySelector("[data-search-input]");
    const items = Array.from(root.querySelectorAll("[data-search-item]"));
    const status = root.querySelector("[data-search-status]");
    const empty = root.querySelector("[data-search-empty]");
    if (!form || !input) return;

    const apply = (query) => {
      const needle = (query || "").trim().toLowerCase();
      let visible = 0;
      items.forEach((item) => {
        const haystack = (item.textContent || "").toLowerCase();
        const show = !needle || haystack.includes(needle);
        item.hidden = !show;
        if (show) visible += 1;
      });
      if (status) status.textContent = needle ? visible + " result" + (visible === 1 ? "" : "s") + " for “" + query.trim() + "”" : "Showing " + visible + " newsroom items";
      if (empty) empty.classList.toggle("is-visible", visible === 0);
    };

    const params = new URLSearchParams(window.location.search);
    const initial = params.get("q") || "";
    input.value = initial;
    apply(initial);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.trim();
      const url = new URL(window.location.href);
      if (query) url.searchParams.set("q", query); else url.searchParams.delete("q");
      window.history.replaceState({}, "", url);
      apply(query);
      recordAudienceEvent("search_query", { query_length: query.length, result_count: items.filter((item) => !item.hidden).length });
    });
  });

  document.querySelectorAll("[data-newsletter-preview]").forEach((root) => {
    const button = root.querySelector("[data-newsletter-submit]");
    const state = root.querySelector("[data-newsletter-state]");
    if (!button) return;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      if (state) state.textContent = "Preview only: no email address was sent or stored. The receiver and double-opt-in flow still need to be connected.";
      recordAudienceEvent("newsletter_interest", { state: "preview_only" });
    });
  });
})();