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

    if (bookingSection && window.location.hash === '#booking') {
        window.setTimeout(() => {
            bookingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
});
