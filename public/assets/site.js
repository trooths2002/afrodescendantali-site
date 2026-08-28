// Black World Modern Utility v0.1 — governed non-production presentation layer
(function (document) {
    if (document.getElementById('bwmu-v01-stylesheet')) return;
    var styleLink = document.createElement('link');
    styleLink.id = 'bwmu-v01-stylesheet';
    styleLink.rel = 'stylesheet';
    styleLink.href = '/assets/bwmu-v01.css?v=20260828-01';
    document.head.appendChild(styleLink);
})(document);

// Google Analytics 4 — existing production measurement retained
(function (window, document, measurementId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
    var googleTag = document.createElement('script');
    googleTag.async = true;
    googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(googleTag, firstScript);
})(window, document, 'G-11B3ZP3DH2');

document.addEventListener('DOMContentLoaded', function () {
    var primaryNavigation = [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Work', href: '/work' },
        { label: 'Analysis', href: '/analysis/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
    ];
    var normalizePath = function (value) {
        var path = (value || '/').replace(/\.html$/, '');
        if (path.length > 1 && path.endsWith('/')) { path = path.slice(0, -1); }
        return path || '/';
    };
    var currentPath = normalizePath(window.location.pathname);

    // Route-scoped visual modes. Presentation only: semantic/AEO source truth remains in HTML + JSON.
    document.body.classList.add('bwmu-v01');
    if (currentPath === '/') document.body.classList.add('bwmu-home');
    if (currentPath === '/services' || currentPath.indexOf('/services/') === 0) document.body.classList.add('bwmu-services');
    if (currentPath === '/work' || currentPath.indexOf('/work/') === 0) document.body.classList.add('bwmu-work');
    if (currentPath === '/method') document.body.classList.add('bwmu-method');
    if (currentPath === '/contact') document.body.classList.add('bwmu-contact');
    if (currentPath === '/about') document.body.classList.add('bwmu-about');
    if (currentPath === '/analysis' || currentPath.indexOf('/analysis/') === 0) document.body.classList.add('bwmu-analysis');

    var renderNav = function (root, isFooter) {
        if (!root) { return; }
        root.innerHTML = '';
        primaryNavigation.forEach(function (item) {
            var link = document.createElement('a');
            link.href = item.href;
            link.textContent = item.label;
            link.classList.add('site-nav-link');
            var itemPath = normalizePath(item.href);
            var isCurrent = currentPath === itemPath || (itemPath === '/services' && currentPath.indexOf('/services/') === 0) || (itemPath === '/analysis' && currentPath.indexOf('/analysis/') === 0);
            if (isCurrent) { link.setAttribute('aria-current', 'page'); }
            if (!isFooter && (item.label === 'Services' || item.label === 'Contact' || item.label === 'Work')) link.setAttribute('data-lead-track', 'nav_' + item.label.toLowerCase());
            root.appendChild(link);
        });
    };
    renderNav(document.querySelector('[data-nav-menu]'), false);
    document.querySelectorAll('[data-footer-nav], .footer-nav').forEach(function (root) { renderNav(root, true); });

    var toggle = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-nav-menu]');
    if (toggle && menu) {
        var setOpen = function (isOpen) {
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            menu.hidden = !isOpen;
        };
        var syncForViewport = function () {
            if (window.innerWidth >= 768) { menu.hidden = false; toggle.setAttribute('aria-expanded', 'true'); toggle.setAttribute('aria-label', 'Primary navigation'); }
            else setOpen(false);
        };
        toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
        menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { if (window.innerWidth < 768) setOpen(false); }); });
        window.addEventListener('resize', syncForViewport);
        syncForViewport();
    }

    // Owned/public-safe artifacts already published in this first-party repository.
    var artifactCards = [
        { image: '/analysis/afcfta-implementation-watch/assets/dashboard-preview-reference.webp', type: 'Research system', label: 'AfCFTA implementation dashboard' },
        { image: '/analysis/afcfta-implementation-watch/assets/explainer-library-reference.webp', type: 'Editorial product', label: 'Explainer library' },
        { image: '/analysis/afcfta-implementation-watch/assets/short-form-education-reference.webp', type: 'Media system', label: 'Short-form education package' },
        { image: '/analysis/afcfta-implementation-watch/assets/trade-friction-reference.webp', type: 'Research visual', label: 'Trade-friction evidence view' },
        { image: '/assets/articles/au-caricom-reparations-institutional-link-20260810.jpg', type: 'Published analysis', label: 'Africa–Caribbean reparations analysis' }
    ];
    var buildArtifactBand = function (title, intro) {
        var section = document.createElement('section');
        section.className = 'bwmu-artifact-band reveal-on-scroll';
        var figures = artifactCards.map(function (item) {
            return '<figure class="bwmu-artifact-card"><img loading="lazy" src="' + item.image + '" alt="' + item.label + ' — owned Afrodescendant Ali public project artifact"><figcaption><span class="bwmu-artifact-type">' + item.type + '</span>' + item.label + '</figcaption></figure>';
        }).join('');
        section.innerHTML = '<div class="bwmu-artifact-intro"><div><span class="eyebrow">Real work, already public</span><h2>' + title + '</h2></div><p>' + intro + '</p></div><div class="bwmu-artifact-grid">' + figures + '</div>';
        return section;
    };
    if (currentPath === '/' && !document.querySelector('.bwmu-artifact-band')) {
        var homeHero = document.querySelector('.intelligence-desk-hero');
        if (homeHero) {
            var homeArtifacts = buildArtifactBand('Ideas become things you can use.', 'The site should show the work, not just describe capability. These are owned, first-party public artifacts from Afrodescendant Ali research, publishing and media systems; they do not imply client endorsement or private-client outcomes.');
            homeHero.insertAdjacentElement('afterend', homeArtifacts);
            var accessBand = document.createElement('section');
            accessBand.className = 'bwmu-access-band reveal-on-scroll';
            accessBand.innerHTML = '<div class="bwmu-access-inner"><div class="bwmu-access-copy"><span class="eyebrow">For Black-world builders</span><h2>Bring the idea. Build something real.</h2><p>Afrodescendant Ali is built for people across the Black world who have a business, side project, publication, campaign, organization, research need, or digital problem they want to move forward. The goal is professional execution within reach—serious work without big-agency distance or unnecessary overhead.</p><div class="site-cta-row mt-8"><a href="/services" class="site-button site-button--primary">See what I can help build</a><a href="/contact?type=Not%20Sure" class="site-button site-button--secondary">Tell me the idea</a></div></div><aside class="bwmu-access-note"><span class="eyebrow">The outcome</span><strong>Something finished, usable and presentable.</strong><p>A website you can share. A video you can publish. A flyer you can distribute. Research you can use. A system that helps the project move.</p></aside></div>';
            homeArtifacts.insertAdjacentElement('afterend', accessBand);
        }
    }
    if (currentPath === '/work' && !document.querySelector('.bwmu-artifact-band')) {
        var workHero = document.querySelector('.page-hero');
        if (workHero) workHero.insertAdjacentElement('afterend', buildArtifactBand('The proof is in what gets made.', 'Selected Work stays claim-safe and often anonymized. This visual layer uses owned public artifacts to show the level of craft without inventing client outcomes or exposing private material.'));
    }

    var serviceArtifactMap = {
        '/services/media-content-publication': { image: '/analysis/afcfta-implementation-watch/assets/short-form-education-reference.webp', type: 'Owned public media artifact', title: 'A repeatable short-form education system', copy: 'A first-party example of turning research into a visible media product. It demonstrates production craft without implying a private-client result.' },
        '/services/websites-digital-presence': { image: '/analysis/afcfta-implementation-watch/assets/full-page-v2-reference.webp', type: 'Owned public web artifact', title: 'A structured public intelligence web experience', copy: 'A first-party page system showing responsive information architecture, visual hierarchy, evidence presentation, and practical web implementation.' },
        '/services/research-communications-public-affairs': { image: '/analysis/afcfta-implementation-watch/assets/trade-friction-reference.webp', type: 'Owned public research artifact', title: 'Evidence organized for a decision or public explanation', copy: 'The work combines source discipline, visual synthesis, and readable outputs while keeping unknowns and caveats visible.' },
        '/services/business-knowledge-audience-systems': { image: '/analysis/afcfta-implementation-watch/assets/dashboard-preview-reference.webp', type: 'Owned public system artifact', title: 'Information turned into a working system', copy: 'An example of structuring recurring information so a project can be tracked, updated, and used instead of living in scattered files.' },
        '/services/specialist-intelligence-automation': { image: '/assets/articles/art-005-source-infrastructure.svg', type: 'Owned public systems artifact', title: 'Human-readable work with machine-readable structure underneath', copy: 'A public-safe example of the systems thinking behind discoverability, source infrastructure, and bounded automation work.' }
    };
    var serviceArtifact = serviceArtifactMap[currentPath];
    if (serviceArtifact && !document.querySelector('.bwmu-service-artifact')) {
        var serviceHero = document.querySelector('.page-hero');
        if (serviceHero) {
            var visual = document.createElement('section');
            visual.className = 'bwmu-service-artifact reveal-on-scroll';
            visual.innerHTML = '<figure><img loading="lazy" src="' + serviceArtifact.image + '" alt="' + serviceArtifact.title + ' — owned Afrodescendant Ali public artifact"><figcaption><span class="bwmu-artifact-type">' + serviceArtifact.type + '</span><strong>' + serviceArtifact.title + '</strong><p>' + serviceArtifact.copy + '</p></figcaption></figure>';
            serviceHero.insertAdjacentElement('afterend', visual);
        }
    }

    var trackLeadIntent = function (name, detail) {
        var payload = { event: 'lead_intent_click', name: name, detail: detail || {}, path: window.location.pathname, ts: new Date().toISOString() };
        window.afrodescendantAliLeadEvents = window.afrodescendantAliLeadEvents || [];
        window.afrodescendantAliLeadEvents.push(payload);
        if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
        try { var key='afrodescendantAliLeadEvents'; var current=JSON.parse(window.localStorage.getItem(key)||'[]'); current.push(payload); window.localStorage.setItem(key,JSON.stringify(current.slice(-100))); } catch (error) {}
    };

    var emailAddress = 'info@afrodescendantali.com';
    var buildMailto = function (subject, body) {
        var params=[]; if(subject) params.push('subject='+encodeURIComponent(subject)); if(body) params.push('body='+encodeURIComponent(body));
        return 'mailto:'+emailAddress+(params.length?'?'+params.join('&'):'');
    };
    document.querySelectorAll('[data-email-link]').forEach(function(item){ item.href=buildMailto(item.getAttribute('data-email-subject')||'',item.getAttribute('data-email-body')||''); if(item.hasAttribute('data-email-text')) item.textContent=emailAddress; });

    document.querySelectorAll('[data-inquiry-helper]').forEach(function(root){
        var type=root.querySelector('[data-inquiry-type]'), objective=root.querySelector('[data-inquiry-objective]'), deadline=root.querySelector('[data-inquiry-deadline]'), contextNode=root.querySelector('[data-inquiry-context]'), mailto=root.querySelector('.inquiry-mailto');
        if(!type||!objective||!deadline||!mailto) return;
        var params=new URLSearchParams(window.location.search), requestedType=params.get('type'), service=params.get('service');
        if(requestedType) Array.prototype.slice.call(type.options).some(function(option){ if(option.text===requestedType||option.value===requestedType){type.value=option.value;return true;} return false; });
        if(contextNode) contextNode.textContent=service||'No specific service selected.';
        var updateMailto=function(){
            var selectedType=type.value||'Not Sure';
            var body=['Area of help: '+selectedType,'Specific service: '+(service||'[Not selected]'),'','What I need help with:',objective.value||'[Describe the project, problem, or desired result.]','','Deadline or timing:',deadline.value||'[Add timing.]','','Links or source material:','[Add anything that would help me understand the project.]'].join('\n');
            mailto.href=buildMailto(selectedType+' project inquiry',body);
        };
        [type,objective,deadline].forEach(function(field){field.addEventListener('input',updateMailto);field.addEventListener('change',updateMailto);}); updateMailto();
    });

    document.querySelectorAll('[data-analysis-filters]').forEach(function(root){
        var state={topic:'all',type:'all',region:'all'}, cards=document.querySelectorAll('.analysis-card[data-topic]'), empty=document.querySelector('[data-filter-empty]');
        var applyFilters=function(){var visible=0;cards.forEach(function(card){var show=['topic','type','region'].every(function(group){return state[group]==='all'||card.getAttribute('data-'+group)===state[group];});card.hidden=!show;if(show)visible++;});if(empty)empty.hidden=visible!==0;};
        root.querySelectorAll('[data-filter-group]').forEach(function(button){button.addEventListener('click',function(){var group=button.getAttribute('data-filter-group');state[group]=button.getAttribute('data-filter-value');root.querySelectorAll('[data-filter-group="'+group+'"]').forEach(function(item){item.setAttribute('aria-pressed',item===button?'true':'false');});applyFilters();});});applyFilters();
    });

    document.querySelectorAll('[data-lead-track]').forEach(function(item){item.addEventListener('click',function(){trackLeadIntent(item.getAttribute('data-lead-track'),{text:(item.textContent||'').trim(),href:item.getAttribute('href')||''});});});

    if(!document.querySelector('.briefing-cta-layer')&&!document.body.classList.contains('no-global-briefing-cta')){
        var main=document.querySelector('main');
        if(main){var cta=document.createElement('section');cta.className='briefing-cta-layer';cta.innerHTML='<div class="briefing-cta-inner"><div><span class="eyebrow mb-4 block">Need help with this?</span><h2 class="serif-display text-3xl md:text-4xl font-light leading-tight mb-4">Turn the research into a practical next step.</h2><p>I can help with research, media, websites, communications and business systems. Advanced organization-specific intelligence and automation work is handled through Ascend Global Ventures.</p></div><div><a href="/services" class="site-button site-button--light">Explore services</a><a href="/contact?type=Not%20Sure" class="text-link sans-label text-[10px] mt-4 inline-block">Tell me what you need</a></div></div>';main.appendChild(cta);}
    }

    var revealItems=document.querySelectorAll('.reveal-on-scroll');
    if('IntersectionObserver' in window){var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:0.12});revealItems.forEach(function(item){observer.observe(item);});}
    else revealItems.forEach(function(item){item.classList.add('is-visible');});
});