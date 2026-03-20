// Veloxtrades Configuration
const Veloxtrades = {
    // Backend API URL - Your Render backend
    API_BASE_URL: 'https://investment-gto3.onrender.com',

    // NOWPayments Configuration
    NOWPAYMENTS: {
        API_KEY: 'T25301Z-4WJMKC1-G41XRH2-DNA8HRZ',
        API_URL: 'https://api.nowpayments.io/v1',
        IPN_SECRET: 'bb6805f6-dbbb-442d-b31c-255dd3078628',
        WEBHOOK_URL: 'https://investment-gto3.onrender.com/api/nowpayments-webhook'
    },

    // Wallet Addresses for Deposits (YOUR wallets where money will be received)
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
            duration: 20, // hours
            minDeposit: 50,
            maxDeposit: 999,
            durationText: '20 Hours'
        },
        advanced: {
            name: 'Advanced Plan',
            roi: 18,
            duration: 48, // hours (2 days)
            minDeposit: 1000,
            maxDeposit: 5000,
            durationText: '2 Days'
        },
        professional: {
            name: 'Professional Plan',
            roi: 35,
            duration: 96, // hours (4 days)
            minDeposit: 5001,
            maxDeposit: 10000,
            durationText: '4 Days'
        },
        classic: {
            name: 'Classic Plan',
            roi: 50,
            duration: 144, // hours (6 days)
            minDeposit: 10001,
            maxDeposit: Infinity,
            durationText: '6 Days'
        }
    },
// Support Chat Functionality
document.addEventListener('DOMContentLoaded', function() {
    const supportButton = document.getElementById('supportButton');
    const supportModal = document.getElementById('supportModal');
    const closeModal = document.getElementById('closeModal');
    const supportResponse = document.getElementById('supportResponse');
    const questionButtons = document.querySelectorAll('.support-question');
    
    // Auto-response messages
    const responses = {
        about: `<p><strong>About Veloxtrades:</strong><br><br>
        Veloxtrades is a premier investment platform founded in 2021. We use AI-powered trading strategies to help investors grow their wealth. 
        With over $420M in assets traded and 50,000+ active investors, we're committed to transparency and investor education.</p>
        <p>Want to learn more? <a href="about.html">Read our full story here</a> or <a href="https://t.me/Veloxtrades2" target="_blank">chat with us on Telegram</a> 💬</p>`,
        
        investment: `<p><strong>Investment Plans:</strong><br><br>
        We offer flexible investment plans designed for different risk levels and investment goals. Our AI algorithms work 24/7 to maximize returns 
        while managing risk effectively.</p>
        <p>📊 For detailed information about our plans and current rates, please <a href="https://t.me/Veloxtrades2" target="_blank">contact us on Telegram</a> 
        and our team will assist you personally!</p>`,
        
        security: `<p><strong>Is Veloxtrades Safe?</strong><br><br>
        ✅ Yes! We prioritize security with:<br>
        • Bank-level encryption (256-bit SSL)<br>
        • Two-factor authentication (2FA)<br>
        • Cold storage for funds<br>
        • Regular security audits<br>
        • Licensed and regulated platform</p>
        <p>For more security details, <a href="https://t.me/Veloxtrades2" target="_blank">ask our support team on Telegram</a> 🔒</p>`,
        
        start: `<p><strong>How to Start Investing:</strong><br><br>
        Getting started is easy!<br>
        1️⃣ Click the "Sign Up" button above<br>
        2️⃣ Create your account (2 minutes)<br>
        3️⃣ Choose your investment plan<br>
        4️⃣ Make your first deposit<br>
        5️⃣ Start earning returns! 🚀</p>
        <p>Need help? <a href="https://t.me/Veloxtrades2" target="_blank">Contact us on Telegram</a> for step-by-step guidance!</p>`,
        
        contact: `<p><strong>Contact Support:</strong><br><br>
        📱 <strong>Telegram:</strong> <a href="https://t.me/Veloxtrades2" target="_blank">@Veloxtrades2</a><br>
        📧 Email: support@veloxtrades.com<br>
        ⏰ 24/7 Support Available</p>
        <p><strong>👉 For the fastest response, click on our Telegram link!</strong> Our support team is ready to answer all your questions instantly.</p>`
    };
    
    // Toggle modal
    supportButton.addEventListener('click', function() {
        supportModal.classList.toggle('show');
        supportResponse.classList.remove('show');
        supportResponse.innerHTML = '';
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        supportModal.classList.remove('show');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === supportModal) {
            supportModal.classList.remove('show');
        }
    });
    
    // Handle question clicks
    questionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            const responseHtml = responses[question];
            
            supportResponse.innerHTML = responseHtml;
            supportResponse.classList.add('show');
            
            // Auto-scroll to response
            supportResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
});
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

    // Navigation Method
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

    // Get current page name
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

    // Update navigation based on auth status
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
                    userDisplay.textContent = user.name || user.email;
                })
                .catch(() => {
                    userDisplay.textContent = 'User';
                });
        }
    },

    isAuthenticated: function() {
        return !!this.getToken();
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
        document.cookie = `veloxtrades_token=${token}; path=/; max-age=${7*24*60*60}`;
        localStorage.setItem('veloxtrades_token', token);
        sessionStorage.setItem('veloxtrades_token', token);
        this.updateNavigation();
    },

    getToken: function() {
        const cookieMatch = document.cookie.match(/veloxtrades_token=([^;]+)/);
        if (cookieMatch) return cookieMatch[1];

        return localStorage.getItem('veloxtrades_token') || sessionStorage.getItem('veloxtrades_token');
    },

    logout: function() {
        document.cookie = 'veloxtrades_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        localStorage.removeItem('veloxtrades_token');
        localStorage.removeItem('veloxtrades_user');
        sessionStorage.removeItem('veloxtrades_token');
        sessionStorage.removeItem('veloxtrades_user');

        this.updateNavigation();
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
                headers,
                credentials: 'include',
                mode: 'cors'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            if (error.message !== 'API request failed') {
                this.showFlash(error.message, 'error');
            }
            throw error;
        }
    },

    // Auth Methods - FIXED ENDPOINTS to match backend
    async login(username, password) {
        const isEmail = username.includes('@');
        const payload = isEmail ? { email: username, password } : { username, password };

        // FIXED: Changed from '/api/auth/login' to '/api/login' to match backend
        const result = await this.request('/api/login', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (result.success && result.data?.token) {
            this.setToken(result.data.token);
            if (result.data.user) {
                localStorage.setItem('veloxtrades_user', JSON.stringify(result.data.user));
            }
        }

        return result;
    },

    async register(userData) {
        // FIXED: Changed from '/api/auth/register' to '/api/register' to match backend
        return this.request('/api/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    async getProfile() {
        // FIXED: Changed from '/api/auth/profile' to '/api/user/me' to match backend
        const result = await this.request('/api/user/me');
        if (result.success && result.data) {
            localStorage.setItem('veloxtrades_user', JSON.stringify(result.data));
        }
        return result;
    },

    // Wallet & Balance Methods
    async getWalletBalance() {
        return this.request('/api/wallet/balance');
    },

    async getDashboard() {
        return this.request('/api/user/dashboard');
    },

    // Deposit Methods
    async createDeposit(depositData) {
        return this.request('/api/deposit', {  // Changed from '/api/deposits'
            method: 'POST',
            body: JSON.stringify(depositData)
        });
    },

    async getDeposits() {
        return this.request('/api/deposits');
    },

    // Investment Methods
    async getInvestments() {
        return this.request('/api/user/investments');  // Changed from '/api/investments'
    },

    async createInvestment(investmentData) {
        return this.request('/api/invest', {  // Changed from '/api/investments'
            method: 'POST',
            body: JSON.stringify(investmentData)
        });
    },

    async getInvestment(id) {
        return this.request(`/api/investments/${id}`);
    },

    // Withdrawal Methods
    async createWithdrawal(withdrawalData) {
        return this.request('/api/withdraw', {  // Changed from '/api/withdrawals'
            method: 'POST',
            body: JSON.stringify(withdrawalData)
        });
    },

    async getWithdrawals() {
        return this.request('/api/withdrawals');
    },

    // Transaction Methods
    async getTransactions() {
        return this.request('/api/transactions');  // Changed from '/api/user/transactions'
    },

    // NOWPayments Integration Methods
    async getExchangeRate(amount, fromCurrency = 'usd', toCurrency) {
        try {
            const cryptoCode = this.CRYPTO_MAP[toCurrency]?.code || toCurrency;
            const response = await fetch(`${this.NOWPAYMENTS.API_URL}/estimate?amount=${amount}&currency_from=${fromCurrency}&currency_to=${cryptoCode}`, {
                headers: {
                    'x-api-key': this.NOWPAYMENTS.API_KEY
                }
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
                headers: {
                    'x-api-key': this.NOWPAYMENTS.API_KEY
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Payment status error:', error);
            throw error;
        }
    },

    // Test connection to backend
    async testConnection() {
        try {
            const response = await fetch(`${this.API_BASE_URL}/health`, {
                mode: 'cors',
                cache: 'no-cache'
            });
            const data = await response.json();
            console.log('Backend connection successful:', data);
            return true;
        } catch (error) {
            console.error('Backend connection failed:', error);
            return false;
        }
    },

    // Page Protection Method
    protectPage: function(requiredAuth = true) {
        const isAuth = this.isAuthenticated();

        if (requiredAuth && !isAuth) {
            this.showFlash('Please login to access this page', 'warning');
            window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
            return false;
        }

        if (!requiredAuth && isAuth) {
            window.location.href = 'dashboard.html';
            return false;
        }

        return true;
    },

    // Initialize Page
    initPage: function(options = {}) {
        if (options.protected !== undefined) {
            if (!this.protectPage(options.protected)) {
                return false;
            }
        }

        this.updateNavigation();

        if (options.testConnection) {
            this.testConnection();
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

    // Format currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    },

    // Format date
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

    // Get user from storage
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

    // Show toast notification (for dashboard)
    showToast: function(title, message, type = 'info') {
        const event = new CustomEvent('showToast', {
            detail: { title, message, type }
        });
        window.dispatchEvent(event);
    }
};

window.Veloxtrades = Veloxtrades;

// Auto-test connection and setup when page loads
document.addEventListener('DOMContentLoaded', function() {
    Veloxtrades.testConnection();

    // Keep data-nav for backward compatibility
    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.nav;
            Veloxtrades.navigateTo(page);
        });
    });

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
