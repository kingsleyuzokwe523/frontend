// Veloxtrades Configuration
const Veloxtrades = {
    // Backend API URL - Update this to your Render backend
    API_BASE_URL: 'https://investment-gto3.onrender.com',  // Your Render backend URL

    // Alternative: Use environment variable if available (for Render deployment)
    // API_BASE_URL: window.ENV?.API_URL || 'https://investment-gto3.onrender.com',

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
        window.location.href = '/login.html'; // Make sure this matches your login page filename
    },

    // NEW: API Request Helper Methods
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

    // NEW: Auth Methods
    async login(email, password) {
        return this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
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

    // NEW: Investment Methods
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

    // NEW: User Dashboard Methods
    async getDashboard() {
        return this.request('/api/user/dashboard');
    },

    async getTransactions() {
        return this.request('/api/user/transactions');
    },

    // NEW: Test connection to backend
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
    }
};

window.Veloxtrades = Veloxtrades;

// Auto-test connection when page loads
document.addEventListener('DOMContentLoaded', function() {
    Veloxtrades.testConnection();
});