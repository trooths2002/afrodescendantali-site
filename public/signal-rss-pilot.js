(() => {
  const grid = document.querySelector("[data-rss-latest-grid]");
  const status = document.querySelector("[data-rss-pilot-status]");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const menuIcon = menuToggle && menuToggle.querySelector("span[aria-hidden=\"true\"]");
  if (!grid) return;

  const laneLabel = {
    africa: "Africa",
    "black-america": "Black America",
    caribbean: "Caribbean",
    "afro-latin-america": "Afro-Latin America",
    "afro-europe": "Afro-Europe",
    "indian-ocean-global": "Indian Ocean",
    "black-world": "Black World"
  };

  const thumbByLane = {
    africa: "thumb-africa",
    "black-america": "thumb-america",
    caribbean: "thumb-caribbean",
    "afro-latin-america": "thumb-latin",
    "afro-europe": "thumb-europe",
    "indian-ocean-global": "thumb-ocean",
    "black-world": "thumb-america"
  };

  const publishedAnalysis = [
    {
      lane: "africa",
      label: "Implementation brief",
      title: "AfCFTA Is an Implementation Problem Before It Is a Profit Opportunity",
      summary: "An implementation brief on why readiness matters more than opportunity headlines.",
      link: "/analysis/afcfta-implementation-watch/issue-001/"
    },
    {
      lane: "africa",
      label: "Explainer",
      title: "What Is AfCFTA?",
      summary: "An explainer on the continental trade framework and the practical challenge of implementation.",
      link: "/analysis/afcfta-implementation-watch/explainers/what-is-afcfta/"
    },
    {
      lane: "black-world",
      label: "Media systems",
      title: "Why Black Media Needs Controlled Source Infrastructure",
      summary: "How source control supports verification, rights decisions, and human editorial judgment.",
      link: "/analysis/black-world-source-infrastructure/"
    },
    {
      lane: "black-world",
      label: "Historical memory",
      title: "How Black Scholars Restored Kush to the History of the Ancient World",
      summary: "A source-grounded account of Black historical recovery and what the record supports.",
      link: "/analysis/black-scholars-kush-historical-recovery/"
    }
  ];

  const timeLabel = (value) => {
    if (!value) return "time unknown";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "time unknown";
    const hours = Math.max(1, Math.round((Date.now() - date.getTime()) / 3600000));
    return hours === 1 ? "1h ago" : hours + "h ago";
  };

  const isDirectHttpsLink = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && url.pathname !== "/" && url.pathname !== "";
    } catch {
      return false;
    }
  };

  // Public display needs every explicit approval/publication gate. Preview state alone never qualifies.
  const isPubliclyApproved = (item) =>
    item &&
    item.fixture === false &&
    item.approvalState === "approved_for_publication" &&
    item.editorialApproval === "OWNER_APPROVED_FOR_PUBLICATION" &&
    item.publicationState === "PUBLIC" &&
    !item.previewPath &&
    typeof item.title === "string" &&
    item.title.trim().length > 0 &&
    typeof item.summary === "string" &&
    item.summary.trim().length > 0 &&
    typeof item.sourceName === "string" &&
    item.sourceName.trim().length > 0 &&
    laneLabel[item.lane] &&
    isDirectHttpsLink(item.link);

  const analysisCardFor = (item) => {
    const article = document.createElement("article");
    article.className = "story-card";
    article.dataset.contentType = "published-analysis";

    const thumb = document.createElement("div");
    thumb.className = "story-thumb " + (thumbByLane[item.lane] || "thumb-africa");
    const thumbLabel = document.createElement("span");
    thumbLabel.textContent = laneLabel[item.lane];
    thumb.appendChild(thumbLabel);

    const body = document.createElement("div");
    body.className = "story-card-body";

    const kicker = document.createElement("p");
    kicker.className = "story-kicker";
    kicker.textContent = item.label + " · Published analysis";

    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = item.link;
    link.textContent = item.title;
    title.appendChild(link);

    const summary = document.createElement("p");
    summary.textContent = item.summary;

    const source = document.createElement("p");
    source.className = "card-source";
    source.textContent = "Afrodescendant Ali · Public analysis";

    body.append(kicker, title, summary, source);
    article.append(thumb, body);
    return article;
  };

  const renderPublishedAnalysis = () => {
    grid.replaceChildren(...publishedAnalysis.map(analysisCardFor));
    if (status) {
      status.dataset.state = "published-analysis";
      status.textContent = "Published analysis · " + publishedAnalysis.length + " public pieces · Signal queue remains review-only.";
    }
  };

  const cardFor = (item) => {
    const article = document.createElement("article");
    article.className = "story-card";
    article.dataset.feedLane = item.lane;
    article.dataset.sourceStatus = item.sourceStatus || "reviewed";
    article.dataset.approvalState = item.approvalState;

    const thumb = document.createElement("div");
    thumb.className = "story-thumb " + (thumbByLane[item.lane] || "thumb-africa");
    const thumbLabel = document.createElement("span");
    thumbLabel.textContent = laneLabel[item.lane];
    thumb.appendChild(thumbLabel);

    const body = document.createElement("div");
    body.className = "story-card-body";

    const kicker = document.createElement("p");
    kicker.className = "story-kicker";
    kicker.textContent = laneLabel[item.lane] + " · " + timeLabel(item.publishedAt);

    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = item.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = item.title;
    title.appendChild(link);

    const summary = document.createElement("p");
    summary.textContent = item.summary;

    const source = document.createElement("p");
    source.className = "card-source";
    source.textContent = item.sourceName + " · Direct source link";

    body.append(kicker, title, summary, source);
    article.append(thumb, body);
    return article;
  };

  const renderItems = (items) => {
    const approved = items.filter(isPubliclyApproved);
    if (approved.length) {
      grid.replaceChildren(...approved.map(cardFor));
      if (status) {
        status.dataset.state = "ready";
        status.textContent = "Signal · " + approved.length + (approved.length === 1 ? " owner-approved story" : " owner-approved stories");
      }
    } else {
      renderPublishedAnalysis();
    }
  };

  fetch("/news-design-preview/rss-editorial-queue.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("editorial queue unavailable");
      return response.json();
    })
    .then((payload) => {
      if (!payload || !Array.isArray(payload.items)) throw new Error("invalid editorial queue");
      renderItems(payload.items);
    })
    .catch(() => {
      renderPublishedAnalysis();
      if (status) {
        status.dataset.state = "published-analysis";
        status.textContent = "Editorial queue unavailable. Existing public analysis shown; no external items are displayed.";
      }
    });

  if (menuToggle && mobileMenu) {
    const closeMenu = (restoreFocus) => {
      mobileMenu.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      if (menuIcon) menuIcon.textContent = "☰";
      if (restoreFocus) menuToggle.focus();
    };

    menuToggle.addEventListener("click", () => {
      const opening = mobileMenu.hidden;
      mobileMenu.hidden = !opening;
      menuToggle.setAttribute("aria-expanded", String(opening));
      menuToggle.setAttribute("aria-label", opening ? "Close menu" : "Open menu");
      if (menuIcon) menuIcon.textContent = opening ? "×" : "☰";
    });

    mobileMenu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !mobileMenu.hidden) closeMenu(true);
    });
  }
})();
