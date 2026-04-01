document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-nav-menu]');

    if (!toggle || !menu) {
        return;
    }

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
});
