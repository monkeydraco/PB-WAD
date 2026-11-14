function showToast(message, duration = 3000) {
    let toast = document.querySelector('#toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('toast-visible');

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
        toast.classList.remove('toast-visible');
    }, duration);
}

const matchPrices = {
    'match-1': {
        name: 'CSK vs MI',
        prices: {
            general: 1500,
            premium: 3500,
            vip: 7500
        }
    },
    'match-2': {
        name: 'RCB vs KKR',
        prices: {
            general: 1200,
            premium: 3000,
            vip: 6500
        }
    },
    'match-3': {
        name: 'SRH vs CSK',
        prices: {
            general: 1000,
            premium: 2500,
            vip: 5500
        }
    }
};

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

document.addEventListener('DOMContentLoaded', () => {
    const bookingSection = document.querySelector('#booking');
    const matchSelect = document.getElementById('match');
    const standSelect = document.getElementById('stand-category');
    const ticketQuantity = document.getElementById('number-of-tickets');

    const updateBookingSummary = (showConfirmation = false) => {
        const summaryMatch = document.getElementById('summary-match');
        const summaryStand = document.getElementById('summary-stand');
        const summaryPrice = document.getElementById('summary-price');
        const summaryQuantity = document.getElementById('summary-quantity');
        const summaryTotal = document.getElementById('summary-total');

        if (!matchSelect || !standSelect || !ticketQuantity || !summaryMatch) {
            return;
        }

        const selectedMatch = matchPrices[matchSelect.value];
        const selectedStand = standSelect.value;
        const quantity = Math.max(0, Number.parseInt(ticketQuantity.value, 10) || 0);
        const price = selectedMatch?.prices[selectedStand] || 0;
        const total = price * quantity;

        summaryMatch.textContent = selectedMatch?.name || 'Not selected';
        summaryStand.textContent = selectedStand
            ? selectedStand.charAt(0).toUpperCase() + selectedStand.slice(1)
            : 'Not selected';
        summaryPrice.textContent = formatCurrency(price);
        summaryQuantity.textContent = quantity;
        summaryTotal.textContent = formatCurrency(total);

        if (showConfirmation) {
            showToast('Booking summary updated.');
        }
    };

    document.querySelectorAll('.book-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            if (!bookingSection) {
                return;
            }

            event.preventDefault();

            if (matchSelect && button.dataset.match) {
                matchSelect.value = button.dataset.match;
                updateBookingSummary();
            }

            bookingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            showToast('Opening the ticket booking form.');
        });
    });

    if (matchSelect && standSelect && ticketQuantity) {
        matchSelect.addEventListener('change', () => updateBookingSummary(true));
        standSelect.addEventListener('change', () => updateBookingSummary(true));
        ticketQuantity.addEventListener('change', () => updateBookingSummary(true));
        ticketQuantity.addEventListener('input', () => updateBookingSummary());
        updateBookingSummary();
    }

    const filterForm = document.getElementById('filter-form');
    const teamFilter = document.getElementById('team-filter');
    const matchCards = document.querySelectorAll('.match-card');
    const noMatchesMessage = document.getElementById('no-matches');

    function filterMatches(showConfirmation = false) {
        if (!teamFilter || matchCards.length === 0) {
            return;
        }

        const selectedTeam = teamFilter.value;
        let visibleMatches = 0;

        matchCards.forEach((card) => {
            const teams = card.dataset.teams.split(' ');
            const shouldShow = selectedTeam === 'all' || teams.includes(selectedTeam);

            card.hidden = !shouldShow;
            if (shouldShow) {
                visibleMatches += 1;
            }
        });

        if (noMatchesMessage) {
            noMatchesMessage.hidden = visibleMatches !== 0;
        }

        if (showConfirmation) {
            showToast(`${visibleMatches} match${visibleMatches === 1 ? '' : 'es'} displayed.`);
        }
    }

    if (filterForm) {
        filterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            filterMatches(true);
        });
    }

    if (teamFilter) {
        teamFilter.addEventListener('change', () => filterMatches(true));
    }

    document.querySelectorAll('.view-toggle').forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const matchList = document.getElementById('match-list');
            const selectedView = toggle.dataset.view;

            if (!matchList) {
                return;
            }

            matchList.classList.toggle('match-list', selectedView === 'list');
            matchList.classList.toggle('match-grid', selectedView === 'grid');

            document.querySelectorAll('.view-toggle').forEach((button) => {
                const isActive = button === toggle;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            showToast(`${selectedView === 'grid' ? 'Grid' : 'List'} view selected.`);
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const menuIsOpen = navLinks.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(menuIsOpen));
            menuToggle.querySelector('.sr-only').textContent = menuIsOpen
                ? 'Close navigation menu'
                : 'Open navigation menu';
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.querySelector('.sr-only').textContent = 'Open navigation menu';
            });
        });
    }

    if (bookingSection && window.location.hash === '#booking') {
        window.setTimeout(() => {
            bookingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
});
