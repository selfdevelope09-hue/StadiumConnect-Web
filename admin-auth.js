// Admin authentication check

function checkAdminAccess() {
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn');
    
    if (!isAdminLoggedIn || isAdminLoggedIn !== 'true') {
        window.location.href = 'admin-login.html';
        return false;
    }
    
    const loginTime = localStorage.getItem('adminLoginTime');
    if (loginTime) {
        const hoursSinceLogin = (new Date() - new Date(loginTime)) / (1000 * 60 * 60);
        if (hoursSinceLogin > 24) {
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
