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

    document.querySelectorAll('[data-offer-tabs]').forEach(function (root) {
        var tabs = root.querySelectorAll('[data-offer-tab]');
        var panels = root.querySelectorAll('[data-offer-panel]');

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = tab.getAttribute('data-offer-tab');

                tabs.forEach(function (item) {
                    item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
                });

                panels.forEach(function (panel) {
                    panel.hidden = panel.getAttribute('data-offer-panel') !== target;
                });
            });
        });
    });

    document.querySelectorAll('[data-inquiry-helper]').forEach(function (root) {
        var type = root.querySelector('[data-inquiry-type]');
        var objective = root.querySelector('[data-inquiry-objective]');
        var deadline = root.querySelector('[data-inquiry-deadline]');
        var mailto = root.querySelector('.inquiry-mailto');

        if (!type || !objective || !deadline || !mailto) {
            return;
        }

        var updateMailto = function () {
            var selectedType = type.value || 'Inquiry';
            var body = [
                'Inquiry type: ' + selectedType,
                '',
                'Objective:',
                objective.value || '[Add the decision, project, or question.]',
                '',
                'Deadline or timing:',
                deadline.value || '[Add timing.]'
            ].join('\n');

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
                var isVisible = ['topic', 'type', 'region'].every(function (group) {
                    return state[group] === 'all' || card.getAttribute('data-' + group) === state[group];
                });
                card.hidden = !isVisible;
                if (isVisible) {
                    visible += 1;
                }
            });

            if (empty) {
                empty.hidden = visible !== 0;
            }
        };

        root.querySelectorAll('[data-filter-group]').forEach(function (button) {
            button.addEventListener('click', function () {
                var group = button.getAttribute('data-filter-group');
                state[group] = button.getAttribute('data-filter-value');
                root.querySelectorAll('[data-filter-group="' + group + '"]').forEach(function (item) {
                    item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
                });
                applyFilters();
            });
        });

        applyFilters();
    });

    if (!document.querySelector('.coverage-scope-layer') && !document.body.classList.contains('no-global-coverage-scope')) {
        var mainForCoverage = document.querySelector('main');
        if (mainForCoverage) {
            var inNestedSection = location.pathname.indexOf('/analysis/') !== -1 || location.pathname.indexOf('/coverage/') !== -1;
            var prefix = inNestedSection ? '../' : '';
            var coverage = document.createElement('section');
            coverage.className = 'coverage-scope-layer';
            coverage.innerHTML = [
                '<div class="coverage-scope-inner">',
                '<div class="coverage-scope-copy">',
                '<span class="eyebrow mb-4 block">Coverage scope</span>',
                '<h2 class="serif-display">Black-world intelligence across five lanes.</h2>',
                '<p>Sub-Saharan Africa, Black America, the Black Caribbean, Afro-Latino communities, and Afro-Europe are tracked as one connected field of power, capital, media, migration, and historical memory.</p>',
                '<a href="' + prefix + 'coverage/index.html" class="text-link sans-label text-[10px] mt-5 inline-block">Explore coverage</a>',
                '</div>',
                '<div class="coverage-mini-map" aria-label="Coverage areas">',
                '<a href="' + prefix + 'coverage/sub-saharan-africa.html"><span>01</span>Sub-Saharan Africa</a>',
                '<a href="' + prefix + 'coverage/black-america.html"><span>02</span>Black America</a>',
                '<a href="' + prefix + 'coverage/black-caribbean.html"><span>03</span>Black Caribbean</a>',
                '<a href="' + prefix + 'coverage/afro-latino.html"><span>04</span>Afro-Latino</a>',
                '<a href="' + prefix + 'coverage/afro-europe.html"><span>05</span>Afro-Europe</a>',
                '</div>',
                '</div>'
            ].join('');

            var existingBriefing = document.querySelector('.briefing-cta-layer');
            if (existingBriefing) {
                mainForCoverage.insertBefore(coverage, existingBriefing);
            } else {
                mainForCoverage.appendChild(coverage);
            }
        }
    }

    if (!document.querySelector('.commerce-path-layer') && !document.body.classList.contains('no-commerce-path-layer')) {
        var commerceMain = document.querySelector('main');
        var path = location.pathname;
        var isNestedCommercePage = path.indexOf('/analysis/') !== -1 || path.indexOf('/coverage/') !== -1;
        var isCommerceEligible = path.indexOf('/work.html') !== -1 || path.indexOf('/analysis/') !== -1 || path.indexOf('/coverage/') !== -1;

        if (commerceMain && isCommerceEligible) {
            var commercePrefix = isNestedCommercePage ? '../' : '';
            var gumroadProducts = [
                {
                    lane: 'Sub-Saharan Africa',
                    title: 'Sahel critical minerals and corridor intelligence',
                    body: 'Use a dossier when the public issue needs more structure; request a memo when a country, corridor, institution, or deadline matters.',
                    upsell: 'Dossier -> custom memo'
                },
                {
                    lane: 'Black Caribbean',
                    title: 'Caribbean ports, nearshoring, and regional leverage',
                    body: 'Start with a regional product for orientation; request a briefing when Haiti, logistics, climate, migration, or security requires interpretation.',
                    upsell: 'Dossier -> briefing'
                },
                {
                    lane: 'Diaspora capital',
                    title: 'Remittance to equity and Black capital formation',
                    body: 'Use the paid product for the strategic frame; commission a memo when capital flows, institutions, or audience decisions need synthesis.',
                    upsell: 'Product -> custom memo'
                },
                {
                    lane: 'Media systems',
                    title: 'Sovereign media architecture and content-to-revenue systems',
                    body: 'Use the product to understand the operating model; request an audit when channels, CTAs, offers, and follow-up need repair.',
                    upsell: 'Product -> audit'
                }
            ];

            var sourceShelves = {
                africa: [
                    ['Leave!: Operationalizing a Pan African State', 'Continental statecraft and institutional design.', 'https://amzn.to/42ByzC6'],
                    ['Nile Valley Contributions to Civilization', 'African civilizational memory and historical grounding.', 'https://amzn.to/4hBZ93w'],
                    ['Africa: Mother of Western Civilization', 'A source for African history and global knowledge claims.', 'https://amzn.to/4kR2y17']
                ],
                blackAmerica: [
                    ['Blueprint for Black Power', 'Institution-building, political economy, and power analysis.', 'https://amzn.to/4iUb12a'],
                    ['PowerNomics', 'Economic strategy and Black institutional development.', 'https://amzn.to/42o54Vf'],
                    ['My People Are Rising', 'Movement history and grassroots organizing context.', 'https://amzn.to/434pKSz']
                ],
                historicalMemory: [
                    ['Christopher Columbus and the Afrikan Holocaust', 'Colonialism, slavery, and the rise of European capitalism.', 'https://amzn.to/3FO72FP'],
                    ['Know Thyself', 'Cultural identity and self-knowledge.', 'https://amzn.to/4hMgO8M'],
                    ['The African Americans Search for Truth and Knowledge', 'Historical memory and Black knowledge traditions.', 'https://amzn.to/424YnWN']
                ]
            };

            var shelfKey = 'historicalMemory';
            if (path.indexOf('black-america') !== -1 || path.indexOf('diaspora-capital') !== -1) {
                shelfKey = 'blackAmerica';
            } else if (path.indexOf('sub-saharan-africa') !== -1 || path.indexOf('east-africa') !== -1 || path.indexOf('/coverage/') !== -1 && path.indexOf('black-caribbean') === -1 && path.indexOf('afro-latino') === -1 && path.indexOf('afro-europe') === -1) {
                shelfKey = 'africa';
            }

            var commerce = document.createElement('section');
            commerce.className = 'commerce-path-layer reveal-on-scroll';
            commerce.innerHTML = [
                '<div class="analysis-shell commerce-path-inner">',
                '<div class="commerce-path-heading">',
                '<span class="eyebrow mb-4 block">Commerce path</span>',
                '<h2 class="serif-display">Start with paid depth, then route serious questions upward.</h2>',
                '<p>Gumroad products are the first paid step. Each product should point toward the next best action: a briefing for urgent interpretation, a custom memo for written synthesis, or an audit when the full media-to-revenue system needs review.</p>',
                '</div>',
                '<div class="commerce-product-grid">',
                gumroadProducts.map(function (item) {
                    return [
                        '<article class="commerce-product-card">',
                        '<span class="eyebrow">' + item.lane + '</span>',
                        '<h3>' + item.title + '</h3>',
                        '<p>' + item.body + '</p>',
                        '<strong>' + item.upsell + '</strong>',
                        '<div class="commerce-actions">',
                        '<a href="https://teman.gumroad.com" target="_blank" rel="noopener noreferrer" class="text-link sans-label text-[10px]">Browse Gumroad intelligence</a>',
                        '<a href="' + commercePrefix + 'contact.html" class="text-link sans-label text-[10px]">Request application</a>',
                        '</div>',
                        '</article>'
                    ].join('');
                }).join(''),
                '</div>',
                '<div class="source-shelf">',
                '<div class="source-shelf-copy">',
                '<span class="eyebrow mb-4 block">Source shelf</span>',
                '<h3 class="serif-display">Evidence-supporting reading, not the main offer.</h3>',
                '<p>These Amazon links support the public analysis with background reading. They should never replace the primary paid paths: Gumroad dossiers, briefings, memos, and audits.</p>',
                '<p class="affiliate-disclosure">As an Amazon Associate I earn from qualifying purchases.</p>',
                '</div>',
                '<div class="source-shelf-grid">',
                sourceShelves[shelfKey].map(function (item) {
                    return [
                        '<a class="source-shelf-card" href="' + item[2] + '" target="_blank" rel="sponsored noopener noreferrer">',
                        '<strong>' + item[0] + '</strong>',
                        '<span>' + item[1] + '</span>',
                        '</a>'
                    ].join('');
                }).join(''),
                '</div>',
                '</div>',
                '<div class="commerce-decision-note">',
                '<strong>Attribution rule:</strong> keep this as embedded commerce until Gumroad and Amazon clicks produce repeat evidence. A top-level Shop or Resources page is justified only after the manual CTA register shows sustained commerce intent without weakening briefing, memo, or audit inquiries.',
                '</div>',
                '</div>'
            ].join('');

            var briefingLayer = document.querySelector('.briefing-cta-layer');
            if (briefingLayer) {
                commerceMain.insertBefore(commerce, briefingLayer);
            } else {
                commerceMain.appendChild(commerce);
            }
        }
    }

    if (!document.querySelector('.briefing-cta-layer') && !document.body.classList.contains('no-global-briefing-cta')) {
        var main = document.querySelector('main');
        if (main) {
            var cta = document.createElement('section');
            cta.className = 'briefing-cta-layer';
            cta.innerHTML = '<div class="briefing-cta-inner"><div><span class="eyebrow mb-4 block">Briefing layer</span><h2 class="serif-display text-3xl md:text-4xl font-light leading-tight mb-4">Need this analysis applied to a real decision?</h2><p>Send the decision, deadline, and context. The inquiry can be routed to a paid briefing, custom memo, or media intelligence audit.</p></div><a href="' + (location.pathname.indexOf('/analysis/') !== -1 ? '../contact.html' : 'contact.html') + '" class="site-button site-button--light">Start a qualified inquiry</a></div>';
            main.appendChild(cta);
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

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add('is-visible');
        });
    }
});
