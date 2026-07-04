document.addEventListener('DOMContentLoaded', function () {
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

    document.querySelectorAll('[data-lead-track]').forEach(function (item) {
        item.addEventListener('click', function () {
            trackLeadIntent(item.getAttribute('data-lead-track'), {
                text: (item.textContent || '').trim(),
                href: item.getAttribute('href') || ''
            });
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
            mailto.href = 'mailto:info@afrodescendantali.com?subject=' + encodeURIComponent(selectedType + ' inquiry') + '&body=' + encodeURIComponent(body);
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
            cta.innerHTML = '<div class="briefing-cta-inner"><div><span class="eyebrow mb-4 block">Briefing layer</span><h2 class="serif-display text-3xl md:text-4xl font-light leading-tight mb-4">Need this analysis applied to a real decision?</h2><p>Send the decision, deadline, audience, and context. The inquiry can be routed to a paid briefing, custom memo, or media intelligence audit.</p></div><a href="/contact" class="site-button site-button--light" data-lead-track="global_qualified_inquiry">Start a qualified inquiry</a></div>';
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
