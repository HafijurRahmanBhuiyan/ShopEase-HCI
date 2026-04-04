// ShopEase - Admin Management

// Initialize Demo Admin
function initDemoAdmin() {
    const users = getUsers();
    if (!users.find(u => u.email === 'admin@shopease.com')) {
        users.push({
            id: 1,
            name: 'Admin',
            email: 'admin@shopease.com',
            phone: '01600000000',
            password: 'admin123',
            isAdmin: true,
            createdAt: '2024-01-01T00:00:00.000Z'
        });
        saveUsers(users);
    }
}

// Dashboard Statistics
function getDashboardStats() {
    const products = window.products || [];
    const orders = JSON.parse(localStorage.getItem('shopease_orders')) || [];
    const users = getUsers().filter(u => !u.isAdmin);
    const reviews = JSON.parse(localStorage.getItem('shopease_reviews')) || [];
    
    const totalRevenue = orders.reduce((sum, order) => {
        if (order.status !== 'cancelled') {
            return sum + (order.total || 0);
        }
        return sum;
    }, 0);
    
    return {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue,
        pendingOrders: orders.filter(o => o.status === 'placed').length,
        totalReviews: reviews.length
    };
}

// Render Dashboard Stats
function renderDashboardStats() {
    const stats = getDashboardStats();
    
    document.getElementById('stat-products') && (document.getElementById('stat-products').textContent = stats.totalProducts);
    document.getElementById('stat-orders') && (document.getElementById('stat-orders').textContent = stats.totalOrders);
    document.getElementById('stat-users') && (document.getElementById('stat-users').textContent = stats.totalUsers);
    document.getElementById('stat-revenue') && (document.getElementById('stat-revenue').textContent = formatPrice(stats.totalRevenue));
    document.getElementById('stat-pending') && (document.getElementById('stat-pending').textContent = stats.pendingOrders);
}

// Product Management
function getAdminProducts() {
    return JSON.parse(localStorage.getItem('shopease_admin_products')) || products;
}

function saveAdminProducts(products) {
    localStorage.setItem('shopease_admin_products', JSON.stringify(products));
}

function renderAdminProducts() {
    const products = getAdminProducts();
    const tbody = document.getElementById('products-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>
                <img src="${product.images[0]}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            </td>
            <td>
                <strong>${product.name}</strong>
                <br>
                <small style="color: var(--text-light);">${getCategoryName(product.category)}</small>
            </td>
            <td>${formatPrice(product.price)}</td>
            <td>${product.stock}</td>
            <td>
                <span class="stars">${renderStars(product.rating)}</span>
                ${product.rating}
            </td>
            <td>
                <span class="badge ${product.featured ? 'badge-success' : 'badge-primary'}">
                    ${product.featured ? 'Featured' : 'Normal'}
                </span>
            </td>
            <td>
                <div class="action-btns">
                    <button class="action-btn" onclick="editProduct(${product.id})" title="Edit">
                        ✏️
                    </button>
                    <button class="action-btn delete" onclick="deleteProduct(${product.id})" title="Delete">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    let adminProducts = getAdminProducts();
    adminProducts = adminProducts.filter(p => p.id !== productId);
    saveAdminProducts(adminProducts);
    
    renderAdminProducts();
    showToast('Product deleted', 'success');
}

function editProduct(productId) {
    window.location.href = `manage-products.html?edit=${productId}`;
}

// Order Management
function getAllOrders() {
    return JSON.parse(localStorage.getItem('shopease_orders')) || [];
}

function saveAllOrders(orders) {
    localStorage.setItem('shopease_orders', JSON.stringify(orders));
}

function renderAdminOrders() {
    const orders = getAllOrders();
    const tbody = document.getElementById('orders-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customerName || 'Customer'}</td>
            <td>${formatPrice(order.total || 0)}</td>
            <td>${formatDate(order.createdAt)}</td>
            <td>
                <select class="status-select" onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="placed" ${order.status === 'placed' ? 'selected' : ''}>Placed</option>
                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="packed" ${order.status === 'packed' ? 'selected' : ''}>Packed</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>
                <button class="action-btn" onclick="viewOrder('${order.id}')" title="View">
                    👁️
                </button>
            </td>
        </tr>
    `).join('');
}

function updateOrderStatus(orderId, status) {
    const orders = getAllOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        order.status = status;
        
        // Update timeline
        const stages = ['placed', 'confirmed', 'packed', 'shipped', 'delivered'];
        order.timeline = order.timeline.map((t, i) => {
            if (stages.indexOf(t.stage) <= stages.indexOf(status)) {
                return { ...t, completed: true, time: t.time || new Date().toISOString() };
            }
            return t;
        });
        
        saveAllOrders(orders);
        showToast(`Order ${orderId} status updated to ${status}`, 'success');
    }
}

function viewOrder(orderId) {
    const orders = getAllOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        alert(`Order Details:\n\nID: ${order.id}\nCustomer: ${order.customerName}\nPhone: ${order.phone}\nTotal: ${formatPrice(order.total)}\nStatus: ${order.status}\nAddress: ${order.address}`);
    }
}

// User Management
function renderAdminUsers() {
    const users = getUsers().filter(u => !u.isAdmin);
    const tbody = document.getElementById('users-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div class="user-avatar" style="width: 40px; height: 40px; font-size: 16px;">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                    ${user.name}
                </div>
            </td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${formatDate(user.createdAt)}</td>
            <td>${user.orders?.length || 0}</td>
            <td>
                <button class="action-btn" onclick="viewUser('${user.id}')" title="View">
                    👁️
                </button>
            </td>
        </tr>
    `).join('');
}

function viewUser(userId) {
    const users = getUsers();
    const user = users.find(u => u.id === parseInt(userId));
    
    if (user) {
        alert(`User Details:\n\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nOrders: ${user.orders?.length || 0}\nMember since: ${formatDate(user.createdAt)}`);
    }
}

// Review Management
function getAllReviews() {
    return JSON.parse(localStorage.getItem('shopease_reviews')) || [];
}

function saveAllReviews(reviews) {
    localStorage.setItem('shopease_reviews', JSON.stringify(reviews));
}

function renderAdminReviews() {
    const reviews = getAllReviews();
    const tbody = document.getElementById('reviews-table-body');
    if (!tbody) return;
    
    if (reviews.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;">No reviews yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = reviews.map(review => `
        <tr>
            <td>${review.productName}</td>
            <td>${review.reviewerName}</td>
            <td>
                <span class="stars">${renderStars(review.rating)}</span>
            </td>
            <td>${review.comment.substring(0, 50)}...</td>
            <td>
                <button class="action-btn delete" onclick="deleteReview('${review.id}')" title="Delete">
                    🗑️
                </button>
            </td>
        </tr>
    `).join('');
}

function deleteReview(reviewId) {
    if (!confirm('Delete this review?')) return;
    
    let reviews = getAllReviews();
    reviews = reviews.filter(r => r.id !== reviewId);
    saveAllReviews(reviews);
    
    renderAdminReviews();
    showToast('Review deleted', 'success');
}

// Support Requests
function getSupportRequests() {
    return JSON.parse(localStorage.getItem('shopease_support')) || [];
}

function saveSupportRequests(requests) {
    localStorage.setItem('shopease_support', JSON.stringify(requests));
}

function renderSupportRequests() {
    const requests = getSupportRequests();
    const tbody = document.getElementById('support-table-body');
    if (!tbody) return;
    
    if (requests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;">No support requests</td></tr>';
        return;
    }
    
    tbody.innerHTML = requests.map(request => `
        <tr>
            <td>${request.name}</td>
            <td>${request.email}</td>
            <td>${request.subject}</td>
            <td>${request.message.substring(0, 50)}...</td>
            <td>
                <button class="action-btn delete" onclick="deleteSupportRequest('${request.id}')" title="Delete">
                    🗑️
                </button>
            </td>
        </tr>
    `).join('');
}

function deleteSupportRequest(requestId) {
    if (!confirm('Delete this request?')) return;
    
    let requests = getSupportRequests();
    requests = requests.filter(r => r.id !== requestId);
    saveSupportRequests(requests);
    
    renderSupportRequests();
    showToast('Request deleted', 'success');
}

// Category Management
function getAdminCategories() {
    return JSON.parse(localStorage.getItem('shopease_admin_categories')) || categories;
}

function saveAdminCategories(cats) {
    localStorage.setItem('shopease_admin_categories', JSON.stringify(cats));
}

function renderAdminCategories() {
    const cats = getAdminCategories();
    const tbody = document.getElementById('categories-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = cats.map(cat => `
        <tr>
            <td>
                <img src="${cat.image}" alt="${cat.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            </td>
            <td><strong>${cat.name}</strong></td>
            <td>${cat.icon}</td>
            <td>${cat.productCount}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn" onclick="editCategory(${cat.id})" title="Edit">
                        ✏️
                    </button>
                    <button class="action-btn delete" onclick="deleteCategory(${cat.id})" title="Delete">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deleteCategory(catId) {
    if (!confirm('Delete this category?')) return;
    
    let cats = getAdminCategories();
    cats = cats.filter(c => c.id !== catId);
    saveAdminCategories(cats);
    
    renderAdminCategories();
    showToast('Category deleted', 'success');
}

// Initialize Admin Page
document.addEventListener('DOMContentLoaded', () => {
    initDemoAdmin();
    
    // Check admin authentication
    if (window.location.pathname.includes('/admin/')) {
        const user = getCurrentUser();
        if (!user || !isAdmin()) {
            // For demo purposes, auto-login admin
            setCurrentUser({
                id: 1,
                name: 'Admin',
                email: 'admin@shopease.com',
                isAdmin: true
            });
        }
    }
    
    // Render appropriate content
    if (document.getElementById('admin-dashboard')) {
        renderDashboardStats();
    }
    
    if (document.getElementById('products-table-body')) {
        renderAdminProducts();
    }
    
    if (document.getElementById('orders-table-body')) {
        renderAdminOrders();
    }
    
    if (document.getElementById('users-table-body')) {
        renderAdminUsers();
    }
    
    if (document.getElementById('reviews-table-body')) {
        renderAdminReviews();
    }
    
    if (document.getElementById('support-table-body')) {
        renderSupportRequests();
    }
    
    if (document.getElementById('categories-table-body')) {
        renderAdminCategories();
    }
    
    // Active nav link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.admin-nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
