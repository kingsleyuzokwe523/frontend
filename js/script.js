// Live Crypto Ticker with Smooth Animation
class LiveTicker {
    constructor() {
        this.ticker = document.querySelector('.ticker-items');
        this.init();
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

// Social Proof Toast Notifications
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
        this.init();
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
        toast.innerHTML = `
            <i class="fas fa-bell"></i>
            <div class="toast-content">
                <strong>User ${message.user} from ${message.country} just ${message.action}</strong>
                <span>${message.amount}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        this.container.appendChild(toast);

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

// Update Live Activity with Random Data
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
        const depositItems = document.querySelectorAll('.activity-column:first-child .activity-item');
        if (depositItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * depositItems.length);
            const item = depositItems[randomIndex];
            const user = this.users[Math.floor(Math.random() * this.users.length)];
            const country = this.countries[Math.floor(Math.random() * this.countries.length)];
            const amount = `$${(Math.floor(Math.random() * 10000) + 500).toLocaleString()}`;

            item.querySelector('strong').textContent = user;
            item.querySelector('.user-country').textContent = country;
            item.querySelector('.activity-amount').textContent = amount;
        }

        // Update random withdrawal
        const withdrawalItems = document.querySelectorAll('.activity-column:last-child .activity-item');
        if (withdrawalItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * withdrawalItems.length);
            const item = withdrawalItems[randomIndex];
            const user = this.users[Math.floor(Math.random() * this.users.length)];
            const country = this.countries[Math.floor(Math.random() * this.countries.length)];
            const amount = `$${(Math.floor(Math.random() * 8000) + 300).toLocaleString()}`;

            item.querySelector('strong').textContent = user;
            item.querySelector('.user-country').textContent = country;
            item.querySelector('.activity-amount').textContent = amount;
        }
    }
}

// Mobile Navigation Toggle
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.authButtons = document.querySelector('.auth-buttons');
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) &&
                !this.navMenu.contains(e.target) &&
                !this.authButtons.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.authButtons.classList.toggle('active');

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
        this.authButtons.classList.remove('active');

        const bars = this.hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

// Initialize Everything When DOM is Loaded
document.addEventListener('DOMContentLoaded', () => {
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
        if (link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }

        // Add click event to update active state
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('http')) return;

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Close mobile menu if open
            document.querySelector('.hamburger').classList.remove('active');
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.auth-buttons').classList.remove('active');
        });
    });

    // Add hover effects to plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
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
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
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

            // Update only the percentage part
            const text = item.textContent;
            const parts = text.split(':');
            if (parts.length > 1) {
                const priceChange = parts[1].trim();
                const newText = `${parts[0]}: ${priceChange.split(' ')[0]} ${icon} ${isPositive ? '+' : '-'}${change}%`;
                item.innerHTML = newText;
            }
        });
    }, 15000);
});