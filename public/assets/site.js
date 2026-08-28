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
    var renderNav = function (root, isFooter) {
        if (!root) { return; }
        root.innerHTML = '';
        primaryNavigation.forEach(function (item) {
            var link = document.createElement('a');
            link.href = item.href;
            link.textContent = item.label;
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