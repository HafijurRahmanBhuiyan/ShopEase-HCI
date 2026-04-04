// ShopEase - Authentication System

// User Data Management
function getUsers() {
    return JSON.parse(localStorage.getItem('shopease_users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('shopease_users', JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('shopease_currentUser')) || null;
}

function setCurrentUser(user) {
    if (user) {
        localStorage.setItem('shopease_currentUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('shopease_currentUser');
    }
}

// Register User
function register(name, email, phone, password) {
    const users = getUsers();
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        showToast('Email already registered', 'error');
        return false;
    }
    
    // Check if phone already exists
    if (users.find(u => u.phone === phone)) {
        showToast('Phone number already registered', 'error');
        return false;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        password,
        createdAt: new Date().toISOString(),
        orders: [],
        wishlist: [],
        addresses: []
    };
    
    users.push(newUser);
    saveUsers(users);
    
    showToast('Registration successful!', 'success');
    return true;
}

// Login User
function login(emailOrPhone, password) {
    const users = getUsers();
    const user = users.find(u => 
        (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
    );
    
    if (user) {
        setCurrentUser(user);
        showToast(`Welcome back, ${user.name}!`, 'success');
        return true;
    }
    
    showToast('Invalid credentials', 'error');
    return false;
}

// Logout User
function logout() {
    setCurrentUser(null);
    showToast('Logged out successfully', 'success');
    window.location.href = 'index.html';
}

// Check Authentication
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Require Authentication (redirect if not logged in)
function requireAuth() {
    if (!isLoggedIn()) {
        showToast('Please login to continue', 'warning');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Admin Authentication
function isAdmin() {
    const admin = getCurrentUser();
    return admin && admin.email === 'admin@shopease.com';
}

function requireAdmin() {
    if (!isAdmin()) {
        showToast('Admin access required', 'error');
        window.location.href = 'admin/admin-login.html';
        return false;
    }
    return true;
}

// Update User Profile
function updateProfile(updates) {
    const users = getUsers();
    const currentUser = getCurrentUser();
    
    if (!currentUser) return false;
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) return false;
    
    users[userIndex] = { ...users[userIndex], ...updates };
    saveUsers(users);
    setCurrentUser(users[userIndex]);
    
    showToast('Profile updated!', 'success');
    return true;
}

// Add Address
function addAddress(address) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    users[userIndex].addresses = users[userIndex].addresses || [];
    users[userIndex].addresses.push({
        id: Date.now(),
        ...address,
        isDefault: users[userIndex].addresses.length === 0
    });
    
    saveUsers(users);
    setCurrentUser(users[userIndex]);
    
    showToast('Address added!', 'success');
    return true;
}

// Get User Orders
function getUserOrders() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const users = getUsers();
    const user = users.find(u => u.id === currentUser.id);
    return user ? user.orders || [] : [];
}

// Add Order
function addOrder(orderDetails) {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    const order = {
        id: 'ORD' + Date.now(),
        ...orderDetails,
        status: 'placed',
        createdAt: new Date().toISOString(),
        timeline: [
            { stage: 'placed', time: new Date().toISOString(), completed: true },
            { stage: 'confirmed', time: null, completed: false },
            { stage: 'packed', time: null, completed: false },
            { stage: 'out_for_delivery', time: null, completed: false },
            { stage: 'delivered', time: null, completed: false }
        ]
    };
    
    users[userIndex].orders = users[userIndex].orders || [];
    users[userIndex].orders.unshift(order);
    
    // Save order to general orders list for admin
    const allOrders = JSON.parse(localStorage.getItem('shopease_orders')) || [];
    allOrders.push(order);
    localStorage.setItem('shopease_orders', JSON.stringify(allOrders));
    
    saveCart([]);
    
    saveUsers(users);
    setCurrentUser(users[userIndex]);
    
    return order;
}

// Initialize Auth Page
document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    const userNameElements = document.querySelectorAll('.user-name');
    const userEmailElements = document.querySelectorAll('.user-email');
    const authButtons = document.querySelectorAll('.auth-buttons');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (user) {
        userNameElements.forEach(el => el.textContent = user.name);
        userEmailElements.forEach(el => el.textContent = user.email);
        
        authButtons?.forEach(el => el.style.display = 'none');
        userDropdown?.classList.remove('hidden');
        
        // Update user avatar
        const avatarElements = document.querySelectorAll('.user-avatar');
        avatarElements.forEach(el => {
            el.textContent = user.name.charAt(0).toUpperCase();
        });
    } else {
        authButtons?.forEach(el => el.style.display = 'flex');
        userDropdown?.classList.add('hidden');
    }
});

// Register Form Handler
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    
    if (!name || !email || !phone || !password) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (register(name, email, phone, password)) {
        // Auto login after registration
        if (login(email, password)) {
            window.location.href = 'index.html';
        }
    }
}

// Login Form Handler
function handleLogin(event) {
    event.preventDefault();
    
    const emailOrPhone = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!emailOrPhone || !password) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    if (login(emailOrPhone, password)) {
        const redirect = new URLSearchParams(window.location.search).get('redirect');
        window.location.href = redirect || 'index.html';
    }
}
