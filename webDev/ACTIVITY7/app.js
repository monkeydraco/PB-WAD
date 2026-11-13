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
    const bookButtons = document.querySelectorAll('.book-button');

    bookButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            if (!bookingSection) {
                return;
            }

            event.preventDefault();
            bookingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            showToast('Opening the ticket booking form.');
        });
    });

    const matchSelect = document.getElementById('match');
    const standSelect = document.getElementById('stand-category');
    const ticketQuantity = document.getElementById('number-of-tickets');
    const summaryMatch = document.getElementById('summary-match');
    const summaryStand = document.getElementById('summary-stand');
    const summaryPrice = document.getElementById('summary-price');
    const summaryQuantity = document.getElementById('summary-quantity');
    const summaryTotal = document.getElementById('summary-total');

    function updateBookingSummary(showConfirmation = false) {
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
    }

    if (matchSelect && standSelect && ticketQuantity) {
        matchSelect.addEventListener('change', () => updateBookingSummary(true));
        standSelect.addEventListener('change', () => updateBookingSummary(true));
        ticketQuantity.addEventListener('change', () => updateBookingSummary(true));
        ticketQuantity.addEventListener('input', () => updateBookingSummary());
        updateBookingSummary();
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
