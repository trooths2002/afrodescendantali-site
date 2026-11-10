// Google Analytics 4 — EXE-20260813-011
(function (window, document, measurementId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    var googleTag = document.createElement('script');
    googleTag.async = true;
    googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(googleTag, firstScript);
})(window, document, 'G-11B3ZP3DH2');

document.addEventListener('DOMContentLoaded', function () {
    var readerNavLinks = [
        { label: 'News', href: '/news.html' },
        { label: 'Regions', href: '/coverage/' },
        { label: 'Analysis', href: '/analysis/' },
        { label: 'Video & audio', href: '/media.html' },
        { label: 'Briefings', href: '/starter-brief.html' },
        { label: 'Newsletter', href: '/newsletter.html' },
        { label: 'Search', href: '/search.html' },
        { label: 'Send a tip', href: '/tips.html' },
        { label: 'Work with us', href: '/work.html' },
        { label: 'About', href: '/about.html' }
    ];
    var footerNavLinks = [
        { label: 'How we report', href: '/standards.html' },
        { label: 'Corrections', href: '/corrections.html' },
        { label: 'Newsletter', href: '/newsletter.html' },
        { label: 'Search', href: '/search.html' },
        { label: 'Send a tip', href: '/tips.html' },
        { label: 'Contact', href: '/contact.html' }
    ];
    var renderLinks = function (selector, links, className) {
        document.querySelectorAll(selector).forEach(function (root) {
            root.textContent = '';
            links.forEach(function (item) {
                var link = document.createElement('a');
                link.href = item.href;
                link.textContent = item.label;
                link.className = className;
                if (window.location.pathname === item.href || (item.href === '/news.html' && window.location.pathname === '/news')) {
                    link.setAttribute('aria-current', 'page');
                }
                root.appendChild(link);
            });
        });
    };
    renderLinks('[data-nav-menu]', readerNavLinks, 'site-nav-link');
    renderLinks('[data-footer-nav]', footerNavLinks, 'footer-nav-link');

    var toggle = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-nav-menu]');

    if (toggle && menu) {
        var setOpen = function (isOpen) {
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            menu.hidden = !isOpen;
        };
        var syncForViewport = function () {
            if (window.innerWidth >= 768) {
                menu.hidden = false;
                toggle.setAttribute('aria-expanded', 'true');
                toggle.setAttribute('aria-label', 'Primary navigation');
            } else {
                setOpen(false);
            }
        };
        toggle.addEventListener('click', function () {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            setOpen(!expanded);
        });
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 768) {
                    setOpen(false);
                }
            });
        });
        window.addEventListener('resize', syncForViewport);
        syncForViewport();
    }

    var recordAudienceEvent = function (name, detail) {
        var payload = {
            event: 'ada_audience_event',
            name: name,
            detail: detail || {},
            path: window.location.pathname,
            ts: new Date().toISOString()
        };
        window.afrodescendantAliAudienceEvents = window.afrodescendantAliAudienceEvents || [];
        window.afrodescendantAliAudienceEvents.push(payload);
        if (typeof window.gtag === 'function') { window.gtag('event', name, detail || {}); }
        if (Array.isArray(window.dataLayer)) { window.dataLayer.push(payload); }
        try {
            var key = 'afrodescendantAliAudienceEvents';
            var current = JSON.parse(window.localStorage.getItem(key) || '[]');
            current.push(payload);
            window.localStorage.setItem(key, JSON.stringify(current.slice(-200)));
        } catch (error) {}
    };

    var trackLeadIntent = function (name, detail) {
        var payload = {
            event: 'lead_intent_click',
            name: name,
            detail: detail || {},
            path: window.location.pathname,
            ts: new Date().toISOString()
        };
        window.afrodescendantAliLeadEvents = window.afrodescendantAliLeadEvents || [];
        window.afrodescendantAliLeadEvents.push(payload);
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'lead_intent_click', {
                lead_name: name,
                lead_path: window.location.pathname,
                lead_detail: JSON.stringify(detail || {})
            });
        }
        if (Array.isArray(window.dataLayer)) {
            window.dataLayer.push(payload);
        }
        try {
            var key = 'afrodescendantAliLeadEvents';
            var current = JSON.parse(window.localStorage.getItem(key) || '[]');
            current.push(payload);
            window.localStorage.setItem(key, JSON.stringify(current.slice(-100)));
        } catch (error) {}
    };

    var emailUser = 'info';
    var emailDomain = 'afrodescendantali.com';
    var emailAddress = emailUser + '@' + emailDomain;
    var buildMailto = function (subject, body) {
        var params = [];
        if (subject) { params.push('subject=' + encodeURIComponent(subject)); }
        if (body) { params.push('body=' + encodeURIComponent(body)); }
        return 'mailto:' + emailAddress + (params.length ? '?' + params.join('&') : '');
    };

    document.querySelectorAll('[data-email-link]').forEach(function (item) {
        var subject = item.getAttribute('data-email-subject') || '';
        var body = item.getAttribute('data-email-body') || '';
        item.href = buildMailto(subject, body);
        if (item.hasAttribute('data-email-text')) {
            item.textContent = emailAddress;
        }
    });

    document.querySelectorAll('[data-lead-track]').forEach(function (item) {
        item.addEventListener('click', function () {
            var leadName = item.getAttribute('data-lead-track');
            trackLeadIntent(leadName, {
                text: (item.textContent || '').trim(),
                href: item.getAttribute('href') || ''
            });
            if (/starter_brief|briefing/i.test(leadName || '')) { recordAudienceEvent('briefing_request', { lead_name: leadName }); }
            if (/qualified_inquiry|contact_mailto/i.test(leadName || '')) { recordAudienceEvent('qualified_inquiry', { lead_name: leadName }); }
        });
    });

    document.querySelectorAll('[data-story-link]').forEach(function (item) {
        item.addEventListener('click', function () {
            var parent = item.closest('[data-story-id]');
            recordAudienceEvent('story_click', {
                story_id: parent ? parent.getAttribute('data-story-id') : '',
                story_type: parent ? parent.getAttribute('data-story-type') : '',
                region: parent ? parent.getAttribute('data-region') : ''
            });
        });
    });

    document.querySelectorAll('[data-story-id]').forEach(function (item) {
        recordAudienceEvent('story_impression', {
            story_id: item.getAttribute('data-story-id') || '',
            story_type: item.getAttribute('data-story-type') || '',
            region: item.getAttribute('data-region') || ''
        });
    });

    document.querySelectorAll('[data-publication-meta]').forEach(function (item) {
        recordAudienceEvent('publishing_cadence_snapshot', {
            last_reviewed: item.getAttribute('data-last-reviewed') || '',
            cadence: item.getAttribute('data-cadence') || '',
            visible_stories: item.getAttribute('data-visible-stories') || ''
        });
    });

    try {
        var visitKey = 'afrodescendantAliReaderVisits';
        var visits = Number(window.localStorage.getItem(visitKey) || '0') + 1;
        window.localStorage.setItem(visitKey, String(visits));
        recordAudienceEvent(visits > 1 ? 'reader_returning' : 'reader_first_visit', { visit_count: visits });
    } catch (error) {}

    document.querySelectorAll('[data-site-search]').forEach(function (root) {
        var form = root.querySelector('[data-search-form]');
        var input = root.querySelector('[data-search-input]');
        var items = Array.prototype.slice.call(root.querySelectorAll('[data-search-item]'));
        var status = root.querySelector('[data-search-status]');
        var empty = root.querySelector('[data-search-empty]');
        if (!form || !input) { return; }
        var apply = function (query) {
            var needle = (query || '').trim().toLowerCase();
            var visible = 0;
            items.forEach(function (item) {
                var show = !needle || (item.textContent || '').toLowerCase().indexOf(needle) !== -1;
                item.hidden = !show;
                if (show) { visible += 1; }
            });
            if (status) { status.textContent = needle ? visible + ' result' + (visible === 1 ? '' : 's') + ' for “' + query.trim() + '”' : 'Showing ' + visible + ' newsroom items'; }
            if (empty) { empty.classList.toggle('is-visible', visible === 0); }
        };
        var params = new URLSearchParams(window.location.search);
        var initial = params.get('q') || '';
        input.value = initial;
        apply(initial);
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var query = input.value.trim();
            var url = new URL(window.location.href);
            if (query) { url.searchParams.set('q', query); } else { url.searchParams.delete('q'); }
            window.history.replaceState({}, '', url);
            apply(query);
            recordAudienceEvent('search_query', { query_length: query.length, result_count: items.filter(function (item) { return !item.hidden; }).length });
        });
    });

    document.querySelectorAll('[data-newsletter-preview]').forEach(function (root) {
        var button = root.querySelector('[data-newsletter-submit]');
        var state = root.querySelector('[data-newsletter-state]');
        if (!button) { return; }
        button.addEventListener('click', function (event) {
            event.preventDefault();
            if (state) { state.textContent = 'Preview only: no email address was sent or stored. The receiver and double-opt-in flow still need to be connected.'; }
            recordAudienceEvent('newsletter_interest', { state: 'preview_only' });
        });
    });

    // ADA -> AGV Passive Bridge Telemetry -- OPP-20260903-015
    document.querySelectorAll('[data-agv-bridge]').forEach(function (item) {
        item.addEventListener('click', function () {
            var variant = item.getAttribute('data-agv-bridge') || 'unknown';
            var href = item.getAttribute('href') || '';
            var bridgePayload = {
                source_surface: 'afrodescendantali',
                source_page: window.location.pathname,
                source_content_type: 'bridge_attribution',
                bridge_variant: variant,
                destination: href,
                campaign: 'ada_agv_bridge_v01',
                text: (item.textContent || '').trim(),
                ts: new Date().toISOString()
            };

            // 1. Emit GA4 custom event
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'ada_agv_bridge_click', {
                    source_surface: bridgePayload.source_surface,
                    source_page: bridgePayload.source_page,
                    source_content_type: bridgePayload.source_content_type,
                    bridge_variant: bridgePayload.bridge_variant,
                    destination: bridgePayload.destination,
                    campaign: bridgePayload.campaign
                });
            }

            // 2. Preserve in site dataLayer for GTM / event observers
            if (Array.isArray(window.dataLayer)) {
                window.dataLayer.push({
                    event: 'ada_agv_bridge_click',
                    bridge_variant: variant,
                    destination: href,
                    source_page: window.location.pathname
                });
            }

            // 3. Record in first-party local lead intent stream
            trackLeadIntent('ada_agv_bridge_' + variant, bridgePayload);
        });
    });

    document.querySelectorAll('[data-offer-tabs]').forEach(function (root) {
        var tabs = root.querySelectorAll('[data-offer-tab]');
        var panels = root.querySelectorAll('[data-offer-panel]');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = tab.getAttribute('data-offer-tab');
                tabs.forEach(function (item) { item.setAttribute('aria-selected', item === tab ? 'true' : 'false'); });
                panels.forEach(function (panel) { panel.hidden = panel.getAttribute('data-offer-panel') !== target; });
                trackLeadIntent('offer_tab_' + target, { target: target });
            });
        });
    });

    document.querySelectorAll('[data-inquiry-helper]').forEach(function (root) {
        var type = root.querySelector('[data-inquiry-type]');
        var objective = root.querySelector('[data-inquiry-objective]');
        var deadline = root.querySelector('[data-inquiry-deadline]');
        var mailto = root.querySelector('.inquiry-mailto');
        if (!type || !objective || !deadline || !mailto) { return; }
        var updateMailto = function () {
            var selectedType = type.value || 'Inquiry';
            var body = ['Inquiry type: ' + selectedType, '', 'Objective:', objective.value || '[Add the decision, project, or question.]', '', 'Deadline or timing:', deadline.value || '[Add timing.]'].join('\n');
            mailto.href = buildMailto(selectedType + ' inquiry', body);
        };
        [type, objective, deadline].forEach(function (field) {
            field.addEventListener('input', updateMailto);
            field.addEventListener('change', updateMailto);
        });
        updateMailto();
    });

    document.querySelectorAll('[data-analysis-filters]').forEach(function (root) {
        var state = { topic: 'all', type: 'all', region: 'all' };
        var cards = document.querySelectorAll('.analysis-card[data-topic]');
        var empty = document.querySelector('[data-filter-empty]');
        var applyFilters = function () {
            var visible = 0;
            cards.forEach(function (card) {
                var isVisible = ['topic', 'type', 'region'].every(function (group) { return state[group] === 'all' || card.getAttribute('data-' + group) === state[group]; });
                card.hidden = !isVisible;
                if (isVisible) { visible += 1; }
            });
            if (empty) { empty.hidden = visible !== 0; }
        };
        root.querySelectorAll('[data-filter-group]').forEach(function (button) {
            button.addEventListener('click', function () {
                var group = button.getAttribute('data-filter-group');
                state[group] = button.getAttribute('data-filter-value');
                root.querySelectorAll('[data-filter-group="' + group + '"]').forEach(function (item) { item.setAttribute('aria-pressed', item === button ? 'true' : 'false'); });
                trackLeadIntent('analysis_filter_' + group + '_' + state[group], { group: group, value: state[group] });
                applyFilters();
            });
        });
        applyFilters();
    });

    if (!document.querySelector('.briefing-cta-layer') && !document.body.classList.contains('no-global-briefing-cta')) {
        var main = document.querySelector('main');
        if (main) {
            var cta = document.createElement('section');
            cta.className = 'briefing-cta-layer';
            cta.innerHTML = '<div class="briefing-cta-inner"><div><span class="eyebrow mb-4 block">Need a clear next move?</span><h2 class="serif-display text-3xl md:text-4xl font-light leading-tight mb-4">Need this work applied to a real decision?</h2><p>Tell us the outcome, deadline, audience, and context. We can route the request to a briefing, memo, or media and intelligence review.</p></div><a href="/contact" class="site-button site-button--light" data-lead-track="global_qualified_inquiry">Work with us</a></div>';
            main.appendChild(cta);
            cta.querySelectorAll('[data-lead-track]').forEach(function (item) {
                item.addEventListener('click', function () { trackLeadIntent(item.getAttribute('data-lead-track'), { text: (item.textContent || '').trim(), href: item.getAttribute('href') || '' }); });
            });
        }
    }

    var revealItems = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach(function (item) { observer.observe(item); });
    } else {
        revealItems.forEach(function (item) { item.classList.add('is-visible'); });
    }
});
