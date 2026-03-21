// script.js - Common Functions

// User Functions
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function updateNavBar() {
    const user = getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    if (user) {
        navLinks.innerHTML = `
            <a href="directory.html">Vendors</a>
            <a href="dashboard.html">Dashboard</a>
            <div class="user-info">
                <span class="user-name">👤 ${user.name}</span>
                <button class="logout-btn" onclick="logout()">Logout</button>
            </div>
        `;
    } else {
        navLinks.innerHTML = `
            <a href="directory.html">Vendors</a>
            <div class="auth-buttons">
                <a href="login.html">Login</a>
                <a href="register.html">Register</a>
            </div>
        `;
    }
}

// Booking Functions
function saveBooking(booking) {
    let bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    bookings.push({
        ...booking,
        id: Date.now(),
        userId: getCurrentUser()?.id,
        date: new Date().toISOString(),
        status: 'pending'
    });
    localStorage.setItem('userBookings', JSON.stringify(bookings));
}

function getUserBookings() {
    const user = getCurrentUser();
    if (!user) return [];
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    return bookings.filter(b => b.userId === user.id);
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavBar();
});
