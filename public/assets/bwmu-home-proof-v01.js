(function () {
  function ensurePortfolioStyles() {
    if (document.querySelector('link[href*="work-portfolio-v01.css"]')) return;
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.href='/assets/work-portfolio-v01.css?v=20260828-01';
    document.head.appendChild(link);
  }

  function run() {
    if (!document.body.classList.contains('bwmu-home')) return;
    ensurePortfolioStyles();

    var heroPanel=document.querySelector('.home-desk-panel');
    if (heroPanel) {
      heroPanel.classList.add('bwmu-hero-visual-panel');
      heroPanel.innerHTML=[
        '<div class="bwmu-hero-visual" role="img" aria-label="Afrodescendant Ali project visual combining a responsive website, Black-world media production, business launch work, and an Africa network field.">',
          '<img class="bwmu-hero-network" src="/analysis/afcfta-implementation-watch/assets/hero-africa-trade-network.webp" alt="" aria-hidden="true">',
          '<div class="bwmu-hero-browser">',
            '<span class="bwmu-window-dots" aria-hidden="true"><i></i><i></i><i></i></span>',
            '<img src="/assets/work/work-agv-website-v01.jpg" alt="Desktop and mobile website work built by Afrodescendant Ali">',
            '<span class="bwmu-hero-tag">Website + systems</span>',
          '</div>',
          '<div class="bwmu-hero-float bwmu-hero-float--research">',
            '<img src="/assets/work/work-media-beckles-v01.jpg" alt="Research-led media package built by Afrodescendant Ali">',
            '<span>Media + content</span>',
          '</div>',
          '<div class="bwmu-hero-float bwmu-hero-float--media">',
            '<img src="/assets/work/work-service-business-launch-v01.jpg" alt="Anonymized service-business launch package">',
            '<span>Business launch</span>',
          '</div>',
          '<div class="bwmu-hero-flow" aria-hidden="true"><span>Idea</span><b>→</b><span>Build</span><b>→</b><span>Finished work</span></div>',
        '</div>',
        '<div class="bwmu-hero-visual-copy">',
          '<span class="eyebrow">What Afrodescendant Ali does</span>',
          '<h2>Turn an idea, problem, or body of information into something usable.</h2>',
          '<p>Research, websites, media, communications, and business systems are different ways of helping Black-world builders move a real project forward.</p>',
          '<div class="bwmu-hero-service-links">',
            '<a href="/services/media-content-publication">Media</a>',
            '<a href="/services/websites-digital-presence">Websites</a>',
            '<a href="/services/research-communications-public-affairs">Research & communications</a>',
            '<a href="/services/business-knowledge-audience-systems">Business systems</a>',
          '</div>',
        '</div>'
      ].join('');
    }

    var band=document.querySelector('.bwmu-artifact-band');
    if (!band) return;
    band.className='home-portfolio-v01 reveal-on-scroll is-visible';
    band.innerHTML=[
      '<div class="home-portfolio-v01__head">',
        '<div><span class="eyebrow">Selected work</span><h2>See what an idea can become.</h2></div>',
        '<p>A business website, a research-led media package, and a service-business launch are three different kinds of work—but the purpose is the same: turn something you want to do into something finished, usable, and presentable.</p>',
      '</div>',
      '<div class="home-portfolio-v01__grid">',
        '<article class="home-proof-case">',
          '<a class="home-proof-case__media" href="/work#case-website"><img loading="lazy" src="/assets/work/work-agv-website-v01.jpg" alt="Desktop and mobile Ascend Global Ventures website work"></a>',
          '<div class="home-proof-case__body"><span class="home-proof-case__type">Website & digital presence</span><h3>A complex service became a usable public website.</h3><p>Information architecture, responsive pages, proof, inquiry routing, and machine discoverability brought together in one first-party build.</p><div class="home-proof-case__links"><a href="/work#case-website">See the case →</a><a href="/services/websites-digital-presence">Website services</a></div></div>',
        '</article>',
        '<article class="home-proof-case">',
          '<a class="home-proof-case__media" href="/work#case-media"><img loading="lazy" src="/assets/work/work-media-beckles-v01.jpg" alt="Sir Hilary Beckles reparations media package"></a>',
          '<div class="home-proof-case__body"><span class="home-proof-case__type">Media, content & publication</span><h3>Research became a visual story people could move through.</h3><p>Historical argument, contextual imagery, editorial sequencing, and finished carousel design turned into a reusable media package.</p><div class="home-proof-case__links"><a href="/work#case-media">See the case →</a><a href="/services/media-content-publication">Media services</a></div></div>',
        '</article>',
        '<article class="home-proof-case">',
          '<a class="home-proof-case__media" href="/work#case-launch"><img loading="lazy" src="/assets/work/work-service-business-launch-v01.jpg" alt="Anonymized business launch website, marketing, and readiness work"></a>',
          '<div class="home-proof-case__body"><span class="home-proof-case__type">Service-business launch</span><h3>A business idea moved toward a credible public launch.</h3><p>Website and marketing previews were connected to the practical launch work behind them: claims, brand assets, contact channels, and readiness gates.</p><div class="home-proof-case__links"><a href="/work#case-launch">See the case →</a><a href="/services/websites-digital-presence">Launch & website services</a></div></div>',
        '</article>',
      '</div>',
      '<div class="home-portfolio-v01__footer"><a href="/work">Explore all selected work →</a></div>'
    ].join('');
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',run);
  else run();
})();