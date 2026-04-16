// Main.js - Global Logic

document.addEventListener('DOMContentLoaded', () => {
    void checkAuthState();
    setupNavbar();
});

async function checkAuthState() {
    const authButtons = document.getElementById('auth-buttons');
    const userProfile = document.getElementById('user-profile');
    const navAvatar = document.getElementById('navAvatar');
    const logoutBtn = document.getElementById('logoutBtn');

    const setAnonymous = () => {
        if (authButtons) authButtons.style.display = 'flex';
        if (userProfile) userProfile.style.display = 'none';
    };

    try {
        const response = await fetch('/api/auth/me', {
            credentials: 'same-origin',
            cache: 'no-store',
        });

        if (!response.ok) {
            localStorage.removeItem('osi_user');
            setAnonymous();
            return;
        }

        const result = await response.json();
        const user = result.data;
        localStorage.setItem('osi_user', JSON.stringify(user));
        if (authButtons) authButtons.style.display = 'none';
        if (userProfile) {
            userProfile.style.display = 'flex';
            navAvatar.textContent = user.username[0].toUpperCase();
        }
    } catch (error) {
        console.error('Failed to hydrate auth state:', error);
        setAnonymous();
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    credentials: 'same-origin',
                });
            } catch (error) {
                console.error('Logout request failed:', error);
            }
            localStorage.removeItem('osi_user');
            window.location.reload();
        });
    }
}

function setupNavbar() {
    // Mobile menu toggle logic to be added here
}
