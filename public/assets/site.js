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
