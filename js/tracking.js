// ShopEase - Order Tracking System

const TRACKING_STAGES = [
    { id: 'placed', name: 'Order Placed', icon: '📋', desc: 'Your order has been received' },
    { id: 'confirmed', name: 'Confirmed', icon: '✓', desc: 'Order confirmed by seller' },
    { id: 'packed', name: 'Packed', icon: '📦', desc: 'Order is being packed' },
    { id: 'shipped', name: 'Shipped', icon: '🚚', desc: 'Out for delivery' },
    { id: 'delivered', name: 'Delivered', icon: '🏠', desc: 'Delivered to your address' }
];

// Get order by ID
function getOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('shopease_orders')) || [];
    return orders.find(o => o.id === orderId);
}

// Get current user's orders
function getMyOrders() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const allOrders = JSON.parse(localStorage.getItem('shopease_orders')) || [];
    return allOrders.filter(o => o.customerEmail === currentUser.email);
}

// Render tracking timeline
function renderTrackingTimeline(order) {
    const timeline = document.getElementById('tracking-timeline');
    if (!timeline) return;
    
    const currentStageIndex = TRACKING_STAGES.findIndex(s => s.id === order.status);
    
    timeline.innerHTML = TRACKING_STAGES.map((stage, index) => {
        let stepClass = '';
        if (index < currentStageIndex) {
            stepClass = 'completed';
        } else if (index === currentStageIndex) {
            stepClass = 'active';
        }
        
        const stageData = order.timeline?.find(t => t.stage === stage.id);
        const time = stageData?.time ? formatDateTime(stageData.time) : '';
        
        return `
            <div class="timeline-step ${stepClass}">
                <div class="timeline-marker">
                    ${stage.icon}
                </div>
                <div class="timeline-content">
                    <h4 class="timeline-title">${stage.name}</h4>
                    <p class="timeline-time">${time || (index <= currentStageIndex ? 'In progress' : 'Pending')}</p>
                    <p class="timeline-desc">${stage.desc}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Format date and time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-BD', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Simulate order progress (for demo)
function simulateOrderProgress(orderId) {
    const orders = JSON.parse(localStorage.getItem('shopease_orders')) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const stages = ['placed', 'confirmed', 'packed', 'shipped', 'delivered'];
    const currentIndex = stages.indexOf(order.status);
    
    if (currentIndex < stages.length - 1) {
        // Progress to next stage
        const nextStage = stages[currentIndex + 1];
        order.status = nextStage;
        
        if (order.timeline) {
            order.timeline[currentIndex + 1].completed = true;
            order.timeline[currentIndex + 1].time = new Date().toISOString();
        }
        
        localStorage.setItem('shopease_orders', JSON.stringify(orders));
        renderTrackingTimeline(order);
        updateTrackingHeader(order);
        
        showToast(`Order ${nextStage}!`, 'success');
    }
}

// Update tracking header
function updateTrackingHeader(order) {
    const statusEl = document.getElementById('order-status');
    const idEl = document.getElementById('order-id');
    const badgeEl = document.getElementById('status-badge');
    
    if (idEl) idEl.textContent = order.id;
    
    const statusNames = {
        placed: 'Order Placed',
        confirmed: 'Confirmed',
        packed: 'Being Packed',
        shipped: 'Out for Delivery',
        delivered: 'Delivered',
        cancelled: 'Cancelled'
    };
    
    if (statusEl) statusEl.textContent = statusNames[order.status] || order.status;
    
    if (badgeEl) {
        badgeEl.className = 'tracking-status-badge';
        const colors = {
            placed: 'background-color: var(--warning);',
            confirmed: 'background-color: var(--accent);',
            packed: 'background-color: var(--accent);',
            shipped: 'background-color: var(--accent);',
            delivered: 'background-color: var(--success);',
            cancelled: 'background-color: var(--danger);'
        };
        badgeEl.style.cssText = colors[order.status] || '';
    }
}

// Initialize tracking page
function initTrackingPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id') || localStorage.getItem('lastOrderId');
    
    if (!orderId) {
        showToast('Order not found', 'error');
        setTimeout(() => window.location.href = 'user-dashboard.html', 2000);
        return;
    }
    
    const order = getOrder(orderId);
    
    if (!order) {
        showToast('Order not found', 'error');
        setTimeout(() => window.location.href = 'user-dashboard.html', 2000);
        return;
    }
    
    renderTrackingTimeline(order);
    updateTrackingHeader(order);
    
    // Render delivery info
    renderDeliveryInfo(order);
    
    // Render order items
    renderOrderItems(order);
}

function renderDeliveryInfo(order) {
    const addressEl = document.getElementById('delivery-address');
    if (addressEl) {
        addressEl.innerHTML = `
            <h4>📍 Delivery Address</h4>
            <p><strong>${order.customerName}</strong></p>
            <p>${order.phone}</p>
            <p>${order.address}</p>
        `;
    }
    
    // Estimated delivery
    const etaEl = document.getElementById('estimated-delivery');
    if (etaEl && order.status !== 'delivered') {
        const days = order.status === 'placed' ? '3-5' : 
                     order.status === 'confirmed' ? '2-4' : 
                     order.status === 'packed' ? '1-3' : '1-2';
        etaEl.textContent = `${days} days`;
    }
}

function renderOrderItems(order) {
    const itemsEl = document.getElementById('order-items-list');
    if (!itemsEl || !order.items) return;
    
    itemsEl.innerHTML = order.items.map(item => `
        <div class="order-item">
            <div class="order-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="order-item-info">
                <span class="order-item-name">${item.name}</span>
                <span class="order-item-qty">Qty: ${item.quantity}</span>
            </div>
            <span class="order-item-price">${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
}

// Render order history in dashboard
function renderOrderHistory() {
    const orders = getMyOrders();
    const container = document.getElementById('order-history-list');
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <p style="font-size: 48px; margin-bottom: 16px;">📦</p>
                <h3>No orders yet</h3>
                <p style="color: var(--text-light);">Start shopping to see your orders here</p>
                <a href="products.html" class="btn btn-primary" style="margin-top: 20px;">Browse Products</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = orders.map(order => {
        const statusColors = {
            placed: 'var(--warning)',
            confirmed: 'var(--accent)',
            packed: 'var(--accent)',
            shipped: 'var(--accent)',
            delivered: 'var(--success)',
            cancelled: 'var(--danger)'
        };
        
        return `
            <div class="order-history-item">
                <div class="order-history-image">
                    <img src="${order.items?.[0]?.image || 'https://via.placeholder.com/100'}" alt="Product">
                </div>
                <div class="order-history-info">
                    <h4>${order.id}</h4>
                    <p>${formatDate(order.createdAt)}</p>
                    <p style="color: ${statusColors[order.status]}; font-weight: 600;">
                        ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                </div>
                <div>
                    <p style="font-size: 18px; font-weight: 700;">${formatPrice(order.total)}</p>
                    <a href="tracking.html?id=${order.id}" class="btn btn-sm btn-secondary" style="margin-top: 8px;">
                        Track Order
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('tracking-page')) {
        initTrackingPage();
    }
    
    if (document.getElementById('order-history-list')) {
        renderOrderHistory();
    }
});
