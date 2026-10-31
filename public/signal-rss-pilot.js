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
    { lane: "africa", label: "Implementation brief", title: "AfCFTA Is an Implementation Problem Before It Is a Profit Opportunity", summary: "An implementation brief on why readiness matters more than opportunity headlines.", link: "/analysis/afcfta-implementation-watch/issue-001/" },
    { lane: "africa", label: "Explainer", title: "What Is AfCFTA?", summary: "An explainer on the continental trade framework and the practical challenge of implementation.", link: "/analysis/afcfta-implementation-watch/explainers/what-is-afcfta/" },
    { lane: "black-world", label: "Media systems", title: "Why Black Media Needs Controlled Source Infrastructure", summary: "How source control supports verification, rights decisions, and human editorial judgment.", link: "/analysis/black-world-source-infrastructure/" },
    { lane: "black-world", label: "Historical memory", title: "How Black Scholars Restored Kush to the History of the Ancient World", summary: "A source-grounded account of Black historical recovery and what the record supports.", link: "/analysis/black-scholars-kush-historical-recovery/" }
  ];

  const timeLabel = (value) => {
    if (!value) return "time unknown";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "time unknown";
    const hours = Math.max(1, Math.round((Date.now() - date.getTime()) / 3600000));
    return hours === 1 ? "1h ago" : hours + "h ago";
  };

  const isSourceLinkedSignal = (item) =>
    item &&
    item.recordType === "feed_lead" &&
    item.approvalState === "approved_for_preview" &&
    item.rightsState === "DIRECT_LINK_ONLY" &&
    !item.previewPath &&
    typeof item.link === "string" &&
    item.link.startsWith("https://") &&
    laneLabel[item.lane] &&
    typeof item.title === "string" &&
    item.title.trim().length > 0;

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

  const signalCardFor = (item) => {
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
    kicker.textContent = laneLabel[item.lane] + " · Monitored signal · " + timeLabel(item.publishedAt);
    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = item.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = item.title;
    title.appendChild(link);
    const summary = document.createElement("p");
    summary.textContent = item.summary || "Open the original publisher for the source report.";
    const source = document.createElement("p");
    source.className = "card-source";
    source.textContent = item.sourceName + " · Source link · Not an Afrodescendant Ali article";
    body.append(kicker, title, summary, source);
    article.append(thumb, body);
    return article;
  };

  const renderItems = (items) => {
    const signals = items.filter(isSourceLinkedSignal);
    grid.replaceChildren(...signals.map(signalCardFor), ...publishedAnalysis.map(analysisCardFor));
    if (status) {
      status.dataset.state = "ready";
      status.textContent = "Source-linked coverage · " + signals.length + " monitored signals · original reporting follows editorial review";
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
      grid.replaceChildren(...publishedAnalysis.map(analysisCardFor));
      if (status) {
        status.dataset.state = "published-analysis";
        status.textContent = "Published analysis and source-linked coverage are available while the newsroom queue refreshes.";
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