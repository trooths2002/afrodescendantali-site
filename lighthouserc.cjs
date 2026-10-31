module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run serve:qa",
      startServerReadyPattern: "Available on",
      url: [
        "http://127.0.0.1:4173/",
        "http://127.0.0.1:4173/analysis/",
        "http://127.0.0.1:4173/coverage/",
        "http://127.0.0.1:4173/media.html",
        "http://127.0.0.1:4173/method.html"
      ],
      numberOfRuns: 1
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.65 }],
        "categories:accessibility": ["error", { minScore: 0.90 }],
        "categories:best-practices": ["warn", { minScore: 0.80 }],
        "categories:seo": ["error", { minScore: 0.90 }]
      }
    },
    upload: { target: "filesystem", outputDir: "qa-artifacts/lighthouse" }
  }
};
