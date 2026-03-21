function checkAdminAccess() {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (!loggedIn || loggedIn !== 'true') {
        window.location.href = 'admin-login.html';
        return false;
    }
    const loginTime = localStorage.getItem('adminLoginTime');
    if (loginTime) {
        const hours = (new Date() - new Date(loginTime)) / (1000 * 60 * 60);
        if (hours > 24) {
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminLoginTime');
            window.location.href = 'admin-login.html';
            return false;
        }
    }
    return true;
}

function logoutAdmin() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    window.location.href = 'admin-login.html';
}

// Auto check on admin pages
if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('admin-dashboard.html')) {
    checkAdminAccess();
}
