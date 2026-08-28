(function () {
  function run() {
    if (!document.body.classList.contains('bwmu-home')) return;

    var heroPanel = document.querySelector('.home-desk-panel');
    if (heroPanel) {
      heroPanel.classList.add('bwmu-hero-visual-panel');
      heroPanel.innerHTML = [
        '<div class="bwmu-hero-visual" role="img" aria-label="A first-party Afrodescendant Ali visual showing Black World research, web publishing, media production, and operating systems moving from idea to finished work.">',
          '<img class="bwmu-hero-network" src="/analysis/afcfta-implementation-watch/assets/hero-africa-trade-network.webp" alt="" aria-hidden="true">',
          '<div class="bwmu-hero-browser">',
            '<span class="bwmu-window-dots" aria-hidden="true"><i></i><i></i><i></i></span>',
            '<img src="/analysis/afcfta-implementation-watch/assets/full-page-v2-reference.webp" alt="Complete first-party web experience for the AfCFTA Implementation Watch">',
            '<span class="bwmu-hero-tag">Website + publishing</span>',
          '</div>',
          '<div class="bwmu-hero-float bwmu-hero-float--research">',
            '<img src="/analysis/afcfta-implementation-watch/assets/dashboard-preview-reference.webp" alt="AfCFTA research dashboard">',
            '<span>Research + systems</span>',
          '</div>',
          '<div class="bwmu-hero-float bwmu-hero-float--media">',
            '<img src="/analysis/afcfta-implementation-watch/assets/short-form-education-reference.webp" alt="Short-form media production system">',
            '<span>Media + content</span>',
          '</div>',
          '<div class="bwmu-hero-flow" aria-hidden="true"><span>Question</span><b>→</b><span>Build</span><b>→</b><span>Finished work</span></div>',
        '</div>',
        '<div class="bwmu-hero-visual-copy">',
          '<span class="eyebrow">What Afrodescendant Ali does</span>',
          '<h2>Turn an idea, problem, or body of information into something usable.</h2>',
          '<p>Research, websites, media, communications, and business systems are different outputs of the same practical job: helping Black-world builders move a real project forward.</p>',
          '<div class="bwmu-hero-service-links">',
            '<a href="/services/media-content-publication">Media</a>',
            '<a href="/services/websites-digital-presence">Websites</a>',
            '<a href="/services/research-communications-public-affairs">Research & communications</a>',
            '<a href="/services/business-knowledge-audience-systems">Business systems</a>',
          '</div>',
        '</div>'
      ].join('');
    }

    var band = document.querySelector('.bwmu-artifact-band');
    if (band) {
      var intro = band.querySelector('.bwmu-artifact-intro p');
      if (intro) intro.textContent = 'Each example below is an owned, first-party public artifact. Open the work to see the source context, then follow the service link to understand what kind of client work that capability supports.';

      var grid = band.querySelector('.bwmu-artifact-grid');
      if (grid) {
        var cards = [
          {
            image: '/analysis/afcfta-implementation-watch/assets/dashboard-preview-reference.webp',
            fallback: '/analysis/afcfta-implementation-watch/assets/full-page-v2-reference.webp',
            type: 'Research system',
            title: 'AfCFTA implementation dashboard',
            demonstrate: 'Shows how scattered sources, findings, questions, and verification checks can be organized into a working knowledge system.',
            workHref: '/analysis/afcfta-implementation-watch/#dashboard',
            workLabel: 'Open the dashboard context',
            services: [
              ['/services/business-knowledge-audience-systems', 'Business & knowledge systems'],
              ['/services/research-communications-public-affairs', 'Research & communications']
            ]
          },
          {
            image: '/analysis/afcfta-implementation-watch/assets/explainer-library-reference.webp',
            fallback: '/analysis/afcfta-implementation-watch/assets/full-page-v2-reference.webp',
            type: 'Editorial product',
            title: 'Explainer library',
            demonstrate: 'Shows research synthesis, editorial packaging, information architecture, and reusable public education content.',
            workHref: '/analysis/afcfta-implementation-watch/#explainers',
            workLabel: 'Open the explainer library',
            services: [
              ['/services/research-communications-public-affairs', 'Research & communications'],
              ['/services/media-content-publication', 'Media & publication']
            ]
          },
          {
            image: '/analysis/afcfta-implementation-watch/assets/short-form-education-reference.webp',
            fallback: '/analysis/afcfta-implementation-watch/assets/full-page-v2-reference.webp',
            type: 'Media system',
            title: 'Short-form education package',
            demonstrate: 'Shows how a researched subject can be translated into a repeatable short-form content system for social and editorial distribution.',
            workHref: '/analysis/afcfta-implementation-watch/#shorts',
            workLabel: 'Open the media context',
            services: [
              ['/services/media-content-publication', 'Media, content & publication']
            ]
          },
          {
            image: '/analysis/afcfta-implementation-watch/assets/trade-friction-reference.webp',
            fallback: '/analysis/afcfta-implementation-watch/assets/dashboard-preview-reference.webp',
            type: 'Research visual',
            title: 'Trade-friction evidence view',
            demonstrate: 'Shows evidence triage, issue framing, visual synthesis, and the bridge from public research to a bounded intelligence question.',
            workHref: '/analysis/afcfta-implementation-watch/#friction',
            workLabel: 'Open Trade Friction Watch',
            services: [
              ['/services/specialist-intelligence-automation', 'Specialist intelligence'],
              ['/services/research-communications-public-affairs', 'Research & communications']
            ]
          },
          {
            image: '/assets/articles/au-caricom-reparations-institutional-link-20260810.jpg',
            fallback: '/analysis/afcfta-implementation-watch/assets/hero-africa-trade-network.webp',
            type: 'Published analysis',
            title: 'Africa–Caribbean reparations analysis',
            demonstrate: 'Shows source verification, public-interest analysis, claim discipline, editorial presentation, and a clear path from research to communications support.',
            workHref: '/analysis/au-caricom-reparations-institutional-coordination/',
            workLabel: 'Read the published analysis',
            services: [
              ['/services/research-communications-public-affairs', 'Research, communications & public affairs']
            ]
          }
        ];

        grid.innerHTML = cards.map(function (item) {
          var serviceLinks = item.services.map(function (service) {
            return '<a class="bwmu-proof-service" href="' + service[0] + '">' + service[1] + '</a>';
          }).join('');
          return [
            '<article class="bwmu-proof-card">',
              '<a class="bwmu-proof-media" href="' + item.workHref + '" aria-label="' + item.workLabel + '">',
                '<img loading="lazy" src="' + item.image + '" onerror="this.onerror=null;this.src=\'' + item.fallback + '\';" alt="Complete view of ' + item.title + ' — owned Afrodescendant Ali public artifact">',
              '</a>',
              '<div class="bwmu-proof-body">',
                '<span class="bwmu-artifact-type">' + item.type + '</span>',
                '<h3><a href="' + item.workHref + '">' + item.title + '</a></h3>',
                '<p class="bwmu-proof-demonstrates"><strong>What this demonstrates:</strong> ' + item.demonstrate + '</p>',
                '<a class="bwmu-proof-open" href="' + item.workHref + '">' + item.workLabel + ' →</a>',
                '<div class="bwmu-proof-service-row"><span>Related services</span>' + serviceLinks + '</div>',
              '</div>',
            '</article>'
          ].join('');
        }).join('');
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();