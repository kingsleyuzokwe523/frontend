// Veloxtrades Main Script
// Version: 2.1.0
// Last Updated: March 21, 2025

// ============================================
// LIVE CRYPTO TICKER
// ============================================
class LiveTicker {
    constructor() {
        this.ticker = document.querySelector('.ticker-items');
        if (this.ticker) {
            this.init();
        }
    }

    init() {
        // Clone ticker items for seamless scrolling
        const items = this.ticker.innerHTML;
        this.ticker.innerHTML = items + items;

        // Reset animation when it completes
        this.ticker.addEventListener('animationiteration', () => {
            this.ticker.style.animation = 'none';
            setTimeout(() => {
                this.ticker.style.animation = 'tickerScroll 30s linear infinite';
            }, 10);
        });
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
class ToastNotifications {
    constructor() {
        this.container = document.getElementById('toastContainer');
        this.messages = [
            { user: "John D.", country: "USA", amount: "$1,400", action: "withdrew" },
            { user: "Sarah M.", country: "UK", amount: "$500", action: "started in Gold Plan" },
            { user: "Mike R.", country: "Canada", amount: "$2,300", action: "deposited" },
            { user: "Emma L.", country: "Australia", amount: "$3,100", action: "withdrew" },
            { user: "David K.", country: "Germany", amount: "$750", action: "started in Premium Plan" },
            { user: "Lisa P.", country: "France", amount: "$1,800", action: "withdrew" },
            { user: "Robert T.", country: "Japan", amount: "$4,200", action: "deposited" }
        ];
        this.currentIndex = 0;
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        // Show first toast after 3 seconds
        setTimeout(() => this.showToast(), 3000);
        // Show new toast every 10 seconds
        setInterval(() => this.showToast(), 10000);
    }

    showToast() {
        const message = this.messages[this.currentIndex];
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 12px 16px;
            margin-bottom: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideIn 0.3s ease;
            border-left: 4px solid #10b981;
        `;
        toast.innerHTML = `
            <i class="fas fa-bell" style="color: #10b981;"></i>
            <div class="toast-content" style="flex: 1;">
                <strong>${message.user} from ${message.country} just ${message.action}</strong>
                <div style="font-size: 14px; color: #10b981; font-weight: bold;">${message.amount}</div>
            </div>
            <button class="toast-close" style="background: none; border: none; cursor: pointer; color: #999;">
                <i class="fas fa-times"></i>
            </button>
        `;

        this.container.appendChild(toast);
        
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.onclick = () => toast.remove();
        }

        // Remove toast after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);

        // Move to next message
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
    }
}

// ============================================
// LIVE ACTIVITY UPDATER
// ============================================
class LiveActivity {
    constructor() {
        this.users = [
            "Michael R.", "Sarah L.", "David K.", "Emma S.", "James P.",
            "John D.", "Robert T.", "Lisa M.", "Thomas B.", "Maria G.",
            "Alex J.", "Sophie W.", "Kevin B.", "Olivia M.", "Daniel R."
        ];

        this.countries = ["USA", "UK", "Canada", "Australia", "Germany", "France", "Japan", "Netherlands", "Spain", "Italy"];
        this.init();
    }

    init() {
        // Update activity every 30 seconds
        setInterval(() => this.updateActivity(), 30000);
    }

    updateActivity() {
        // Update random deposit
        const depositColumn = document.querySelector('.activity-column:first-child .activity-list');
        if (depositColumn) {
            const depositItems = depositColumn.querySelectorAll('.activity-item');
            if (depositItems.length > 0) {
                const randomIndex = Math.floor(Math.random() * depositItems.length);
                const item = depositItems[randomIndex];
                const user = this.users[Math.floor(Math.random() * this.users.length)];
                const country = this.countries[Math.floor(Math.random() * this.countries.length)];
                const amount = `$${(Math.floor(Math.random() * 10000) + 500).toLocaleString()}`;

                const strongEl = item.querySelector('strong');
                const countryEl = item.querySelector('.user-country');
                const amountEl = item.querySelector('.activity-amount');
                
                if (strongEl) strongEl.textContent = user;
                if (countryEl) countryEl.textContent = country;
                if (amountEl) amountEl.textContent = amount;
            }
        }

        // Update random withdrawal
        const withdrawalColumn = document.querySelector('.activity-column:last-child .activity-list');
        if (withdrawalColumn) {
            const withdrawalItems = withdrawalColumn.querySelectorAll('.activity-item');
            if (withdrawalItems.length > 0) {
                const randomIndex = Math.floor(Math.random() * withdrawalItems.length);
                const item = withdrawalItems[randomIndex];
                const user = this.users[Math.floor(Math.random() * this.users.length)];
                const country = this.countries[Math.floor(Math.random() * this.countries.length)];
                const amount = `$${(Math.floor(Math.random() * 8000) + 300).toLocaleString()}`;

                const strongEl = item.querySelector('strong');
                const countryEl = item.querySelector('.user-country');
                const amountEl = item.querySelector('.activity-amount');
                
                if (strongEl) strongEl.textContent = user;
                if (countryEl) countryEl.textContent = country;
                if (amountEl) amountEl.textContent = amount;
            }
        }
    }
}

// ============================================
// MOBILE NAVIGATION
// ============================================
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu) return;
        
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navMenu.classList.contains('active') && 
                !this.hamburger.contains(e.target) && 
                !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close menu when clicking a link
        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = this.hamburger.querySelectorAll('.bar');
        if (this.hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        
        const bars = this.hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Veloxtrades Script Loaded - Version 2.1.0');
    
    // Initialize components
    new LiveTicker();
    new ToastNotifications();
    new LiveActivity();
    new MobileNavigation();

    // Add active state to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Add hover effects to plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-10px)';
            } else {
                card.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0)';
            } else {
                card.style.transform = 'scale(1.05)';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update ticker prices randomly (simulating live updates)
    setInterval(() => {
        const tickerItems = document.querySelectorAll('.ticker-item');
        tickerItems.forEach(item => {
            const isPositive = item.classList.contains('positive');
            const change = (Math.random() * 5).toFixed(1);
            const icon = isPositive ? '<i class="fas fa-arrow-up"></i>' : '<i class="fas fa-arrow-down"></i>';
            const sign = isPositive ? '+' : '-';
            
            // Update only the percentage part
            const text = item.textContent;
            const priceMatch = text.match(/\$[\d,]+/);
            if (priceMatch) {
                const price = priceMatch[0];
                const newText = `${price} ${icon} ${sign}${change}%`;
                item.innerHTML = newText;
            }
        });
    }, 15000);
});

// ============================================
// ADD TICKER ANIMATION CSS IF NOT EXISTS
// ============================================
if (!document.querySelector('#ticker-animation-style')) {
    const style = document.createElement('style');
    style.id = 'ticker-animation-style';
    style.textContent = `
        @keyframes tickerScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .ticker-items {
            animation: tickerScroll 30s linear infinite;
            white-space: nowrap;
        }
        .ticker-items:hover {
            animation-play-state: paused;
        }
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        .toast {
            animation: slideIn 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// AUTHENTICATION HELPERS (if not using config.js)
// ============================================
if (typeof Veloxtrades === 'undefined') {
    window.Veloxtrades = {
        API_BASE_URL: 'https://investment-gto3.onrender.com',
        
        isAuthenticated: function() {
            return !!this.getToken();
        },
        
        getToken: function() {
            const cookieMatch = document.cookie.match(/veloxtrades_token=([^;]+)/);
            if (cookieMatch) return cookieMatch[1];
            return localStorage.getItem('veloxtrades_token');
        },
        
        setToken: function(token) {
            const maxAge = 30 * 24 * 60 * 60;
            document.cookie = `veloxtrades_token=${token}; path=/; max-age=${maxAge}; secure; samesite=Lax`;
            localStorage.setItem('veloxtrades_token', token);
        },
        
        logout: function() {
            document.cookie = 'veloxtrades_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            localStorage.removeItem('veloxtrades_token');
            localStorage.removeItem('veloxtrades_user');
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
                
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'API request failed');
                }
                return data;
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        },
        
        async login(username, password) {
            try {
                const result = await this.request('/api/login', {
                    method: 'POST',
                    body: JSON.stringify({ username, password })
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
                return { success: false, message: error.message };
            }
        },
        
        async verifyToken() {
            try {
                return await this.request('/api/verify-token', { method: 'GET' });
            } catch {
                return { success: false };
            }
        }
    };
}
