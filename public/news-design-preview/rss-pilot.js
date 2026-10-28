(() => {
  const grid = document.querySelector("[data-rss-latest-grid]");
  const status = document.querySelector("[data-rss-pilot-status]");
  if (!grid) return;

  const thumbByLane = {
    africa: "thumb-africa",
    "black-america": "thumb-america",
    caribbean: "thumb-caribbean",
    "afro-latin-america": "thumb-latin",
    "afro-europe": "thumb-europe",
    "indian-ocean-global": "thumb-ocean"
  };

  const laneLabel = {
    africa: "Africa",
    "black-america": "Black America",
    caribbean: "Caribbean",
    "afro-latin-america": "Afro-Latin America",
    "afro-europe": "Afro-Europe",
    "indian-ocean-global": "Indian Ocean"
  };

  const timeLabel = (value) => {
    if (!value) return "time unknown";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "time unknown";
    const hours = Math.max(1, Math.round((Date.now() - date.getTime()) / 3600000));
    return hours === 1 ? "1h ago" : hours + "h ago";
  };

  const cardFor = (item) => {
    const article = document.createElement("article");
    article.className = "story-card";
    article.dataset.feedLane = item.lane;
    article.dataset.sourceStatus = item.sourceStatus;

    const thumb = document.createElement("div");
    thumb.className = "story-thumb " + (thumbByLane[item.lane] || "thumb-africa");
    const thumbLabel = document.createElement("span");
    thumbLabel.textContent = laneLabel[item.lane] || item.lane;
    thumb.appendChild(thumbLabel);

    const body = document.createElement("div");
    body.className = "story-card-body";

    const kicker = document.createElement("p");
    kicker.className = "story-kicker";
    kicker.textContent = (laneLabel[item.lane] || item.lane) + " · " + timeLabel(item.publishedAt);

    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = item.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = item.title;
    title.appendChild(link);

    const summary = document.createElement("p");
    summary.textContent = item.summary || "Open the direct source for the publisher's reporting.";

    const source = document.createElement("p");
    source.className = "card-source";
    source.textContent = item.sourceName + " · Direct source link · Preview approved";

    body.append(kicker, title, summary, source);
    article.append(thumb, body);
    return article;
  };

  fetch("./rss-editorial-queue.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("preview queue unavailable");
      return response.json();
    })
    .then((payload) => {
      const approved = payload.items.filter((item) => item.approvalState === "approved_for_preview" && item.link);
      const pending = payload.items.filter((item) => item.approvalState === "pending_review").length;
      grid.replaceChildren(...approved.map(cardFor));
      if (status) {
        status.dataset.state = "ready";
        status.textContent = "RSS pilot preview · " + approved.length + " approved cards · " + pending + " pending review · feed activation disabled";
      }
    })
    .catch(() => {
      if (status) {
        status.dataset.state = "error";
        status.textContent = "RSS pilot preview unavailable · static fallback retained · feed activation disabled";
      }
    });
})();
