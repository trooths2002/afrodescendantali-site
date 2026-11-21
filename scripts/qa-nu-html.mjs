import { readFile } from "node:fs/promises";
import { join } from "node:path";

if (process.env.QA_SKIP_NETWORK_CHECKS === "1") {
  console.log("SKIP Nu HTML network validation (QA_SKIP_NETWORK_CHECKS=1)");
  process.exit(0);
}

const root = new URL("../public/", import.meta.url).pathname;
const candidates = [
  "index.html",
  "analysis/index.html",
  "coverage/index.html",
  "media.html",
  "method.html",
  "about.html",
  "contact.html"
];
const failures = [];

for (const relative of candidates) {
  let source;
  try {
    source = await readFile(join(root, relative), "utf8");
  } catch {
    continue;
  }

  const response = await fetch("https://validator.w3.org/nu/?out=json", {
    method: "POST",
    headers: { "content-type": "text/html; charset=utf-8" },
    body: source
  });
  if (!response.ok) {
    failures.push(`${relative}: Nu validator HTTP ${response.status}`);
    continue;
  }
  const report = await response.json();
  for (const message of report.messages || []) {
    if (message.type === "error") {
      failures.push(`${relative}: line ${message.lastLine || "?"} ${message.message}`);
    }
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("PASS Nu HTML validation");
}
