// Veloxtrades Configuration
const Veloxtrades = {
    API_BASE_URL: '',
    
    isAuthenticated: function() {
        return document.cookie.includes('veloxtrades_token');
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
    },
    
    getToken: function() {
        const match = document.cookie.match(/veloxtrades_token=([^;]+)/);
        return match ? match[1] : null;
    },
    
    logout: function() {
        document.cookie = 'veloxtrades_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.location.href = '/login';
    }
};

window.Veloxtrades = Veloxtrades;
