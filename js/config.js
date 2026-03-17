// Veloxtrades Configuration
const Veloxtrades = {
    // Backend API URL - Update this to your Render backend
    API_BASE_URL: 'https://investment-gto3.onrender.com',  // Your Render backend URL

    // Alternative: Use environment variable if available (for Render deployment)
    // API_BASE_URL: window.ENV?.API_URL || 'https://investment-gto3.onrender.com',

    // Site Routes Configuration
    ROUTES: {
        home: '/',
        about: '/about.html',
        services: '/services.html',
        contact: '/contact.html',
        login: '/login.html',
        register: '/register.html',
        dashboard: '/dashboard.html',
        investments: '/investments.html',
        profile: '/profile.html',
        transactions: '/transactions.html'
    },

    // Navigation Method
    navigateTo: function(page, params = {}) {
        const route = this.ROUTES[page];
        if (!route) {
            console.error(`Route not found for page: ${page}`);
            return false;
        }

        // Build URL with query parameters if needed
        let url = route;
        if (Object.keys(params).length > 0) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }

        window.location.href = url;
        return true;
    },

    // Get current page name
    getCurrentPage: function() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';

        // Reverse lookup to find page name from route
        for (const [page, route] of Object.entries(this.ROUTES)) {
            if (route === '/' + filename || route === filename) {
                return page;
            }
        }
        return 'unknown';
    },

    // Check if on specific page
    isOnPage: function(page) {
        return this.getCurrentPage() === page;
    },

    // Update navigation based on auth status
    updateNavigation: function() {
        const isAuth = this.isAuthenticated();

        // Update navigation links based on auth status
        const navLinks = document.querySelectorAll('[data-auth]');
        navLinks.forEach(link => {
            const authRequired = link.dataset.auth === 'true';
            if (authRequired && !isAuth) {
                link.style.display = 'none';
            } else if (!authRequired && isAuth && link.dataset.hideWhenAuth === 'true') {
                link.style.display = 'none';
            } else {
                link.style.display = '';
            }
        });

        // Update user display if on page
        const userDisplay = document.getElementById('userDisplay');
        if (userDisplay && isAuth) {
            this.getProfile()
                .then(user => {
                    userDisplay.textContent = user.name || user.email;
                })
                .catch(() => {
                    userDisplay.textContent = 'User';
                });
        }
    },

    isAuthenticated: function() {
        return !!this.getToken(); // Check both cookie and localStorage
    },

    checkAuth: function() {
        return this.isAuthenticated();
    },

    checkPasswordStrength: function(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
        const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

        return { score: strength, text: texts[strength], color: colors[strength] };
    },

    showFlash: function(message, type = 'info') {
        const flash = document.createElement('div');
        flash.className = `flash-message flash-${type}`;
        flash.innerHTML = `<span>${message}</span><button class="flash-close">&times;</button>`;

        const container = document.getElementById('flashContainer') || this.createFlashContainer();
        container.appendChild(flash);

        flash.querySelector('.flash-close').onclick = () => flash.remove();
        setTimeout(() => flash.remove(), 5000);
    },

    createFlashContainer: function() {
        const container = document.createElement('div');
        container.id = 'flashContainer';
        container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;';
        document.body.appendChild(container);
        return container;
    },

    setToken: function(token) {
        // Set in both cookie and localStorage for redundancy
        document.cookie = `veloxtrades_token=${token}; path=/; max-age=${7*24*60*60}`;
        localStorage.setItem('veloxtrades_token', token);

        // Update navigation after login
        this.updateNavigation();
    },

    getToken: function() {
        // Try cookie first, then localStorage
        const cookieMatch = document.cookie.match(/veloxtrades_token=([^;]+)/);
        if (cookieMatch) return cookieMatch[1];

        return localStorage.getItem('veloxtrades_token');
    },

    logout: function() {
        // Clear both cookie and localStorage
        document.cookie = 'veloxtrades_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        localStorage.removeItem('veloxtrades_token');

        // Update navigation after logout
        this.updateNavigation();

        // Redirect to home page
        this.navigateTo('home');
    },

    // API Request Helper Methods
    async request(endpoint, options = {}) {
        const url = `${this.API_BASE_URL}${endpoint}`;
        const token = this.getToken();

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            this.showFlash(error.message, 'error');
            throw error;
        }
    },

    // Auth Methods
    async login(email, password) {
        const result = await this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (result.token) {
            this.setToken(result.token);
        }

        return result;
    },

    async register(userData) {
        return this.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    async getProfile() {
        return this.request('/api/auth/profile');
    },

    // Investment Methods
    async getInvestments() {
        return this.request('/api/investments');
    },

    async createInvestment(investmentData) {
        return this.request('/api/investments', {
            method: 'POST',
            body: JSON.stringify(investmentData)
        });
    },

    async getInvestment(id) {
        return this.request(`/api/investments/${id}`);
    },

    // User Dashboard Methods
    async getDashboard() {
        return this.request('/api/user/dashboard');
    },

    async getTransactions() {
        return this.request('/api/user/transactions');
    },

    // Test connection to backend
    async testConnection() {
        try {
            const response = await fetch(`${this.API_BASE_URL}/health`);
            const data = await response.json();
            console.log('Backend connection successful:', data);
            return true;
        } catch (error) {
            console.error('Backend connection failed:', error);
            this.showFlash('Cannot connect to server. Please try again later.', 'error');
            return false;
        }
    },

    // Page Protection Method
    protectPage: function(requiredAuth = true) {
        const isAuth = this.isAuthenticated();

        if (requiredAuth && !isAuth) {
            // Redirect to login if authentication required but user not logged in
            this.showFlash('Please login to access this page', 'warning');
            this.navigateTo('login', { redirect: window.location.pathname });
            return false;
        }

        if (!requiredAuth && isAuth) {
            // Redirect to dashboard if trying to access login/register while logged in
            this.navigateTo('dashboard');
            return false;
        }

        return true;
    },

    // Initialize Page
    initPage: function(options = {}) {
        // Check page protection
        if (options.protected !== undefined) {
            if (!this.protectPage(options.protected)) {
                return false;
            }
        }

        // Update navigation
        this.updateNavigation();

        // Test connection if needed
        if (options.testConnection) {
            this.testConnection();
        }

        // Load user data if authenticated
        if (this.isAuthenticated() && options.loadUserData) {
            this.getProfile().then(user => {
                if (options.onUserLoaded) {
                    options.onUserLoaded(user);
                }
            }).catch(error => {
                console.error('Failed to load user data:', error);
                if (options.onUserLoadError) {
                    options.onUserLoadError(error);
                }
            });
        }

        return true;
    }
};

window.Veloxtrades = Veloxtrades;

// Auto-test connection and setup when page loads
document.addEventListener('DOMContentLoaded', function() {
    Veloxtrades.testConnection();

    // Setup navigation links
    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.nav;
            Veloxtrades.navigateTo(page);
        });
    });

    // Initialize page if it has a data-page attribute
    const pageElement = document.querySelector('[data-page]');
    if (pageElement) {
        const pageOptions = {
            protected: pageElement.dataset.protected === 'true',
            testConnection: pageElement.dataset.testConnection === 'true',
            loadUserData: pageElement.dataset.loadUserData === 'true'
        };
        Veloxtrades.initPage(pageOptions);
    }
});