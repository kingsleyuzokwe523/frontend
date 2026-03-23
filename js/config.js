// Veloxtrades Configuration
// VERSION: 2.1.6

const Veloxtrades = {
    // Backend API URL - Your Render backend
    API_BASE_URL: 'https://investment-gto3.onrender.com',
    VERSION: '2.1.6',

    // NOWPayments Configuration
    NOWPAYMENTS: {
        API_KEY: 'T25301Z-4WJMKC1-G41XRH2-DNA8HRZ',
        API_URL: 'https://api.nowpayments.io/v1',
        IPN_SECRET: 'bb6805f6-dbbb-442d-b31c-255dd3078628',
        WEBHOOK_URL: 'https://investment-gto3.onrender.com/api/nowpayments-webhook'
    },

    // Wallet Addresses for Deposits
    WALLET_ADDRESSES: {
        BTC: 'bc1q0wa7lht6wgafkdrfsp2cyaa34tmzj6nh8tlqg4',
        SOL: '6cqK7dk6RLucP5WSzusT289j8haUn124YJJbcdZPXhKA',
        LTC: '0xD075339a17430091C66E0904FdD321989A27Bb99',
        ETH: '0xa9d116075d7c569012D33983A0028835Ce87cA2A',
        USDT_TRC20: 'TJxgNmLwkbRRAJFKijWHX6LfP7XucFVX3z'
    },

    // Crypto currency mapping for NOWPayments
    CRYPTO_MAP: {
        btc: { code: 'btc', name: 'Bitcoin', icon: 'fab fa-bitcoin' },
        eth: { code: 'eth', name: 'Ethereum', icon: 'fab fa-ethereum' },
        usdt: { code: 'usdttrc20', name: 'USDT (TRC20)', icon: 'fas fa-dollar-sign' },
        sol: { code: 'sol', name: 'Solana', icon: 'fas fa-coins' },
        ltc: { code: 'ltc', name: 'Litecoin', icon: 'fas fa-coins' }
    },

    // Investment Plans
    INVESTMENT_PLANS: {
        standard: {
            name: 'Standard Plan',
            roi: 8,
            duration: 20,
            minDeposit: 50,
            maxDeposit: 999,
            durationText: '20 Hours'
        },
        advanced: {
            name: 'Advanced Plan',
            roi: 18,
            duration: 48,
            minDeposit: 1000,
            maxDeposit: 5000,
            durationText: '2 Days'
        },
        professional: {
            name: 'Professional Plan',
            roi: 35,
            duration: 96,
            minDeposit: 5001,
            maxDeposit: 10000,
            durationText: '4 Days'
        },
        classic: {
            name: 'Classic Plan',
            roi: 50,
            duration: 144,
            minDeposit: 10001,
            maxDeposit: Infinity,
            durationText: '6 Days'
        }
    },

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
        transactions: '/transactions.html',
        deposit: '/deposit.html',
        withdraw: '/withdraw.html',
        'investment-plans': '/investment-plans.html',
        'forgot-password': '/forgot-password.html'
    },

    navigateTo: function(page, params = {}) {
        const route = this.ROUTES[page];
        if (!route) {
            console.error(`Route not found for page: ${page}`);
            return false;
        }
        let url = route;
        if (Object.keys(params).length > 0) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }
        window.location.href = url;
        return true;
    },

    getCurrentPage: function() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        for (const [page, route] of Object.entries(this.ROUTES)) {
            if (route === '/' + filename || route === filename) {
                return page;
            }
        }
        return 'unknown';
    },

    updateNavigation: function() {
        const isAuth = this.isAuthenticated();
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
        const userDisplay = document.getElementById('userDisplay');
        if (userDisplay && isAuth) {
            this.getProfile()
                .then(user => {
                    if (user && user.username) {
                        userDisplay.textContent = user.username;
                    } else if (user && user.email) {
                        userDisplay.textContent = user.email;
                    } else {
                        userDisplay.textContent = 'User';
                    }
                })
                .catch(() => {
                    userDisplay.textContent = 'User';
                });
        }
    },

    isAuthenticated: function() {
        return !!this.getToken();
    },

    getToken: function() {
        const cookieMatch = document.cookie.match(/veloxtrades_token=([^;]+)/);
        if (cookieMatch) return cookieMatch[1];
        return localStorage.getItem('veloxtrades_token') || sessionStorage.getItem('veloxtrades_token');
    },

    setToken: function(token) {
        const maxAge = 30 * 24 * 60 * 60;
        document.cookie = `veloxtrades_token=${token}; path=/; max-age=${maxAge}; secure; samesite=Lax`;
        localStorage.setItem('veloxtrades_token', token);
        sessionStorage.setItem('veloxtrades_token', token);
        this.updateNavigation();
    },

    logout: function() {
        fetch(`${this.API_BASE_URL}/api/logout`, {
            method: 'POST',
            credentials: 'include'
        }).catch(err => console.error('Logout error:', err));
        document.cookie = 'veloxtrades_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        localStorage.removeItem('veloxtrades_token');
        localStorage.removeItem('veloxtrades_user');
        sessionStorage.removeItem('veloxtrades_token');
        sessionStorage.removeItem('veloxtrades_user');
        this.updateNavigation();
        window.location.href = '/';
    },

    async request(endpoint, options = {}) {
        const url = `${this.API_BASE_URL}${endpoint}`;
        const token = this.getToken();
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        try {
            const response = await fetch(url, {
                ...options,
                headers,
                credentials: 'include',
                mode: 'cors'
            });
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                if (!response.ok) {
                    if (response.status === 401) {
                        this.logout();
                        throw new Error('Session expired. Please login again.');
                    }
                    throw new Error(data.message || data.error || 'API request failed');
                }
                return data;
            } else {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return { success: true };
            }
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async login(username, password) {
        try {
            const payload = { username, password };
            const result = await this.request('/api/login', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            if (result.success && result.data?.token) {
                this.setToken(result.data.token);
                if (result.data.user) {
                    localStorage.setItem('veloxtrades_user', JSON.stringify(result.data.user));
                }
                return { success: true, data: result.data };
            }
            return result;
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.message || 'Login failed' };
        }
    },

    async register(userData) {
        return this.request('/api/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    async getProfile() {
        try {
            const result = await this.request('/api/auth/profile');
            if (result.success && result.data?.user) {
                localStorage.setItem('veloxtrades_user', JSON.stringify(result.data.user));
                return result.data.user;
            }
            return null;
        } catch (error) {
            console.error('Get profile error:', error);
            return null;
        }
    },

    async verifyToken() {
        try {
            const result = await this.request('/api/verify-token', {
                method: 'GET'
            });
            return result;
        } catch (error) {
            console.warn('Token verification error:', error);
            if (this.isAuthenticated()) {
                return { success: true, message: 'Token valid (local check)' };
            }
            return { success: false, message: 'Token invalid' };
        }
    },

    async getWalletBalance() {
        const profile = await this.getProfile();
        return { success: true, balance: profile?.wallet?.balance || 0 };
    },

    async getDashboard() {
        return this.request('/api/user/dashboard');
    },

    async createDeposit(depositData) {
        return this.request('/api/deposit', {
            method: 'POST',
            body: JSON.stringify(depositData)
        });
    },

    async getDeposits() {
        return this.request('/api/deposits');
    },

    async getInvestments() {
        const dashboard = await this.getDashboard();
        if (dashboard.success && dashboard.data) {
            return dashboard.data.investments;
        }
        return { success: false, active_investments: [] };
    },

    async createInvestment(investmentData) {
        return this.request('/api/invest', {
            method: 'POST',
            body: JSON.stringify(investmentData)
        });
    },

    async getInvestment(id) {
        return this.request(`/api/investments/${id}`);
    },

    async createWithdrawal(withdrawalData) {
        return this.request('/api/withdraw', {
            method: 'POST',
            body: JSON.stringify(withdrawalData)
        });
    },

    async getWithdrawals() {
        return this.request('/api/withdrawals');
    },

    async getTransactions() {
        return this.request('/api/transactions');
    },

    async getExchangeRate(amount, fromCurrency = 'usd', toCurrency) {
        try {
            const cryptoCode = this.CRYPTO_MAP[toCurrency]?.code || toCurrency;
            const response = await fetch(`${this.NOWPAYMENTS.API_URL}/estimate?amount=${amount}&currency_from=${fromCurrency}&currency_to=${cryptoCode}`, {
                headers: { 'x-api-key': this.NOWPAYMENTS.API_KEY }
            });
            const data = await response.json();
            return data.estimated_amount;
        } catch (error) {
            console.error('Exchange rate error:', error);
            return null;
        }
    },

    async createNowPayment(paymentData) {
        try {
            const response = await fetch(`${this.NOWPAYMENTS.API_URL}/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.NOWPAYMENTS.API_KEY
                },
                body: JSON.stringify({
                    price_amount: paymentData.amount,
                    price_currency: 'usd',
                    pay_currency: this.CRYPTO_MAP[paymentData.currency]?.code || paymentData.currency,
                    ipn_callback_url: this.NOWPAYMENTS.WEBHOOK_URL,
                    order_id: `ORDER_${Date.now()}_${paymentData.userId}`,
                    order_description: 'Veloxtrades Deposit',
                    success_url: paymentData.successUrl || window.location.href,
                    cancel_url: paymentData.cancelUrl || window.location.href
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Create payment error:', error);
            throw error;
        }
    },

    async checkPaymentStatus(paymentId) {
        try {
            const response = await fetch(`${this.NOWPAYMENTS.API_URL}/payment/${paymentId}`, {
                headers: { 'x-api-key': this.NOWPAYMENTS.API_KEY }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Payment status error:', error);
            throw error;
        }
    },

    async testConnection() {
        try {
            const response = await fetch(`${this.API_BASE_URL}/health`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            console.log('✅ Backend connection successful:', data);
            return true;
        } catch (error) {
            console.log('Backend connection check (non-critical):', error.message);
            return false;
        }
    },

    protectPage: function(requiredAuth = true) {
        const isAuth = this.isAuthenticated();
        if (requiredAuth && !isAuth) {
            this.showFlash('Please login to access this page', 'warning');
            const redirect = encodeURIComponent(window.location.pathname);
            window.location.href = `login.html?redirect=${redirect}`;
            return false;
        }
        if (!requiredAuth && isAuth) {
            window.location.href = 'dashboard.html';
            return false;
        }
        return true;
    },

    initPage: function(options = {}) {
        if (options.protected !== undefined) {
            if (!this.protectPage(options.protected)) {
                return false;
            }
        }
        this.updateNavigation();
        if (options.testConnection) {
            this.testConnection().catch(() => {});
        }
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
    },

    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    },

    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    getUser: function() {
        const userStr = localStorage.getItem('veloxtrades_user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    },

    showToast: function(title, message, type = 'info') {
        const event = new CustomEvent('showToast', {
            detail: { title, message, type }
        });
        window.dispatchEvent(event);
    }
};

window.Veloxtrades = Veloxtrades;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Veloxtrades config loaded - Version 2.1.6');
    
    if (typeof Veloxtrades !== 'undefined' && Veloxtrades.testConnection) {
        Veloxtrades.testConnection().catch(() => {});
    }

    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.nav;
            if (typeof Veloxtrades !== 'undefined' && Veloxtrades.navigateTo) {
                Veloxtrades.navigateTo(page);
            }
        });
    });

    const pageElement = document.querySelector('[data-page]');
    if (pageElement && typeof Veloxtrades !== 'undefined' && Veloxtrades.initPage) {
        const pageOptions = {
            protected: pageElement.dataset.protected === 'true',
            testConnection: pageElement.dataset.testConnection === 'true',
            loadUserData: pageElement.dataset.loadUserData === 'true'
        };
        Veloxtrades.initPage(pageOptions);
    }
    
    if (typeof Veloxtrades !== 'undefined' && Veloxtrades.isAuthenticated && Veloxtrades.isAuthenticated()) {
        setInterval(async () => {
            try {
                const result = await Veloxtrades.verifyToken();
                if (!result.success) {
                    console.warn('Token expired, logging out');
                    Veloxtrades.logout();
                }
            } catch (error) {
                console.error('Token verification error:', error);
            }
        }, 30 * 60 * 1000);
    }
});
