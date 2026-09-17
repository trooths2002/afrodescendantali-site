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
        '<div class="bwmu-hero-visual" role="img" aria-label="Examples of website, media, and business launch work by Afrodescendant Ali.">',
          '<img class="bwmu-hero-network" src="/analysis/afcfta-implementation-watch/assets/hero-africa-trade-network.webp" alt="" aria-hidden="true">',
          '<div class="bwmu-hero-browser">',
            '<span class="bwmu-window-dots" aria-hidden="true"><i></i><i></i><i></i></span>',
            '<img src="/assets/work/work-agv-website-v01.jpg" alt="Desktop and mobile website work">',
            '<span class="bwmu-hero-tag">Website</span>',
          '</div>',
          '<div class="bwmu-hero-float bwmu-hero-float--research">',
            '<img src="/assets/work/work-media-beckles-v01.jpg" alt="Reparations media package">',
            '<span>Media</span>',
          '</div>',
          '<div class="bwmu-hero-float bwmu-hero-float--media">',
            '<img src="/assets/work/work-service-business-launch-v01.jpg" alt="Service-business launch package">',
            '<span>Business launch</span>',
          '</div>',
          '<div class="bwmu-hero-flow" aria-hidden="true"><span>Idea</span><b>→</b><span>Build</span><b>→</b><span>Finished work</span></div>',
        '</div>',
        '<div class="bwmu-hero-visual-copy">',
          '<span class="eyebrow">What I help build</span>',
          '<h2>Turn an idea, problem, or body of information into something useful.</h2>',
          '<p>Websites, media, research, communications, and business systems for people who need a real project to move forward.</p>',
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
        '<p>Websites, media, research, communications and operating systems built to help real projects move forward. Explore selected examples of the problem, the work, and the finished deliverable.</p>',
      '</div>',
      '<div class="home-portfolio-v01__grid">',
        '<article class="home-proof-case">',
          '<a class="home-proof-case__media" href="/work#case-website"><img loading="lazy" src="/assets/work/work-agv-website-v01.jpg" alt="Desktop and mobile Ascend Global Ventures website"></a>',
          '<div class="home-proof-case__body"><span class="home-proof-case__type">Website & digital presence</span><h3>A complex service became a clear, usable website.</h3><p>Strategy, page structure, responsive design, proof, and inquiry paths were brought together into one customer-facing site.</p><div class="home-proof-case__links"><a href="/work#case-website">See the project →</a><a href="/services/websites-digital-presence">Website services</a></div></div>',
        '</article>',
        '<article class="home-proof-case">',
          '<a class="home-proof-case__media" href="/work#case-media"><img loading="lazy" src="/assets/work/work-media-beckles-v01.jpg" alt="Sir Hilary Beckles reparations media package"></a>',
          '<div class="home-proof-case__body"><span class="home-proof-case__type">Media, content & publication</span><h3>A dense argument became a visual story people could follow.</h3><p>Historical context, imagery, sequencing, and design were turned into a finished multi-part media package.</p><div class="home-proof-case__links"><a href="/work#case-media">See the project →</a><a href="/services/media-content-publication">Media services</a></div></div>',
        '</article>',
        '<article class="home-proof-case">',
          '<a class="home-proof-case__media" href="/work#case-launch"><img loading="lazy" src="/assets/work/work-service-business-launch-v01.jpg" alt="Service-business website and marketing launch work"></a>',
          '<div class="home-proof-case__body"><span class="home-proof-case__type">Business launch</span><h3>A service business moved from idea to a more complete launch.</h3><p>Website, marketing materials, contact setup, and launch details were brought together so the business could present itself more professionally.</p><div class="home-proof-case__links"><a href="/work#case-launch">See the project →</a><a href="/services/websites-digital-presence">Website & launch services</a></div></div>',
        '</article>',
      '</div>',
      '<div class="home-portfolio-v01__footer"><a href="/work">Explore all selected work →</a></div>'
    ].join('');
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',run);
  else run();
})();